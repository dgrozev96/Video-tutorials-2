const router = require('express').Router();
const { isGuest, isAuth } = require('../middlewares/authMiddleware');

const authService = require('../services/authService');
const { AUTH_COOKIE_NAME } = require('../constants');



router.get('/login', isGuest, (req, res) => {
    res.render('auth/login')
});

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password })

        //set token in cookie
        res.cookie(AUTH_COOKIE_NAME, token)

        res.redirect('/')
    }
    catch (error) {
        //TODO: RETURN PROPER NOTIFICATION
        res.end('')

    }
})

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register')
});

router.post('/register', isGuest, async (req, res) => {
    const { name, username, password, rePassword } = req.body;

    if (password !== rePassword) {
        res.locals.error = 'Password mismatch'
        return res.render('auth/register')
    }


    try {
        await authService.register({
            name,
            username,
            password,
        });


        let token = await authService.login({
            username,
            password
        })

        res.cookie(AUTH_COOKIE_NAME, token);
        res.redirect('/')
    } catch (err) {
        //TODO return error response
    }



})

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/')
})

module.exports = router;