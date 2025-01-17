exports.userSignupValidator = (req, res, next) => {
    //req.check('name', 'Name is required.').notEmpty();
    req.check('email', 'Please enter a valid email.')
        .matches(/.+@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'Password is required.').notEmpty();
    req.check('password')
        .isLength({ min: 6})
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number.');

    const errors = req.validationErrors();
    if (errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError })
    }
    next();
};

exports.userSignInValidator = (req,res,next) => {
    req.check('email', 'Please enter a valid email.')
        .matches(/.+@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'Password is required.').notEmpty();

    const errors = req.validationErrors();
    if (errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError })
    }
    next();
};

exports.forgotPasswordValidator = (req,res,next) => {
    req.check('email', 'Please enter a valid email.')
        .notEmpty()
        .matches(/.+@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 32
        });

    const errors = req.validationErrors();
    if (errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError })
    }
    next();
};

exports.resetPasswordValidator = (req,res,next) => {
    req.check('newPassword', 'Password is required.').notEmpty();
    req.check('newPassword')
        .isLength({ min: 6})
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number.');

    const errors = req.validationErrors();
    if (errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError })
    }
    next();
};