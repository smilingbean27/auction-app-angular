"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const passportLocal = require("passport-local");
const app = express();
app.use('/s', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
const LocalStrategy = passportLocal.Strategy;
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    if (email === "admin@gmail.com" && password === "admin") {
        const user = { email: email, password: password, isAdmin: true };
        return done(null, user);
    }
    else if (email === 'user@gmail.com' && password === "user") {
        const user = { email: email, password: password, isAdmin: false };
        return done(null, user);
    }
    else {
        return done(null, false, { message: 'Incorrect credentials' });
    }
}));
passport.serializeUser((user, done) => {
    console.log('Inside ser', user);
    if (user)
        done(null, user);
});
passport.deserializeUser((id, done) => {
    console.log(id);
    done(null, { id: id, name: 'test' });
});
var products = [
    {
        id: 34,
        name: 'Football',
        price: 50,
        features: ['Good quality', 'feature-2', 'feature-3'],
        image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
        timePeriod: 1,
        startDateTime: new Date("Jan 07, 2021 11:02:24"),
        endDateTime: new Date("Jan 08, 2021 20:02:24"),
        isInCountry: '',
        entry: true
    },
    {
        id: 77,
        name: 'Watch',
        price: 28,
        features: ['Awesome it is'],
        image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=340&q=80',
        timePeriod: 2,
        startDateTime: new Date("Jan 18, 2021 19:02:24"),
        endDateTime: new Date("Jan 19, 2021 20:02:24"),
        isInCountry: 'IN',
        entry: true,
    }
];
function genId() {
    return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;
}
app.get('/api/products', (req, res) => {
    res.json(products);
});
app.post('/api/products', (req, res) => {
    console.log(req.body);
    const id = genId();
    const product = Object.assign(Object.assign({}, req.body), { id });
    products.push(product);
});
app.get('/api/product/:id', (req, res) => {
    const id = Number(req.params.id);
    res.json(products.find(p => p.id === id));
});
app.delete('/api/product/:id', (req, res) => {
    const id = Number(req.params.id);
    console.log(id);
    products = products.filter(p => p.id !== id);
    console.log(products);
});
app.put('/api/product/:id', (req, res) => {
    const id = Number(req.params.id);
    products = products.filter(p => p.id !== id);
    products.push(req.body);
    console.log(req.body);
});
// Passport Middleware 
const auth = () => {
    return (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (user) {
                if (req.body.adminRoute === user.isAdmin) {
                    req.body = user; // Changing here to include isAdmin inside req.body object
                    next();
                }
                else {
                    res.json(info);
                }
            }
            else {
                res.json(info);
            }
            if (err)
                next(err);
        })(req, res, next);
    };
};
app.post('/api/authenticate', auth(), (req, res) => {
    res.json(req.body);
});
// Server listening at 8000 port 
app.listen(8000, () => {
    console.log('Server is running!');
});
