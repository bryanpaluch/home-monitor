/**
 * Module dependencies.
 */
var express = require('express'),
passport = require('passport'),
categorizr = require('connect-categorizr');
exports.boot = function(app,  passport) {
	bootApplication(app,  passport);
}

function bootApplication(app, passport) {
	console.log('booting express middleware');
  app.use(express.static(__dirname + '/../public'));
	app.set('views', __dirname + '/../app/views');
  app.set('view engine', 'jade');
	app.configure(function() {
    app.locals.pretty = true;
		app.use(function(req, res, next) {
			res.locals.appName = 'Xbee Cloud Cordinator'
			res.locals.title = 'Xbee Cloud Cordinator'
			res.locals.showStack = app.showStackError
			res.locals.req = req
			next()
		})

		app.use(express.logger());
		app.use(express.cookieParser());
		app.use(express.bodyParser());
		app.use(express.session({
			secret: 'oauth'
		}));
		app.use(passport.initialize());
		app.use(passport.session());
    app.use(categorizr());
		app.use(app.router);
    app.use(express.favicon());
		app.use(express.errorHandler({
			dumpExceptions: true,
			showStack: true
		}));
		app.use(function(err, req, res, next) {
			// treat as 404
			if (~err.message.indexOf('not found')) return next()
			// log it
			console.error(err.stack)
			// error page
			res.status(500).render('500')
		});

		// assume 404 since no middleware responded
		app.use(function(req, res, next) {
			res.status(404).render('404', {
				url: req.originalUrl
			});
		});

	});
	app.set('showStackError', true);
	// Passport configuration
}

