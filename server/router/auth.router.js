const router = require("express").Router();
const passport = require("passport");
const { generateToken } = require("../middleware/auth");


router.get("/login/success", (req, res) => {
	if (req.user) {
		const user = req.user;
		user.token = generateToken(user._id)
		const userData = JSON.stringify(user);
		const redirectUrl = `http://localhost:5173/login?data=${encodeURIComponent(userData)}`;
	    res.redirect(redirectUrl);
	} else {
	  res.status(403).json({ error: true, message: "Not Authorized" });
	}
  });

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: "/auth/login/success",
		failureRedirect: "/auth/login/failed",
	})
);	

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

module.exports = router;