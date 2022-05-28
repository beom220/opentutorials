const passport = require("passport");
const {Strategy: LocalStrategy} = require("passport-local");

module.exports = (app, db) => {
//  03 Passport 불러오기
    app.use(passport.initialize());
    app.use(passport.session());

//  06 전달받은 data를 세션Store에 저장
    passport.serializeUser((user, done) => {
        // console.log('serializeUser', user);
        done(null, user.email);
    });
//  07 페이지방문시 세션Store정보를 조회
    passport.deserializeUser((id, done) => {
        // console.log('deserializeUser', id);
        db.query(`SELECT email, password FROM author WHERE email=?`, [id], (err, row)=> {
            if(err) return done(null, false, {message : 'Sql Error'});
            done(null, row[0]);
        })
    })

//  05 전달받은 data를 인증하고 세션으로 전달
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        (username, password, done) => {
            db.query(`SELECT email FROM author` , (err, rows) => {
                if(err) return done(null, false, {message : 'Sql Error'});

                // email 전체를 가져와서 입력값이 일치하는것 배열로 저장
                const user = rows.filter(v => username === v.email);
                // 일치하지 않다면 이메일 에러
                if(user.length === 0) return done(null, false, {message : 'email error'});

                db.query(`SELECT email, password FROM author WHERE email=? AND password=?`, [username, password], (err2, row) => {
                    if(err2) return done(null, false, {message : 'Sql Error'});
                    // console.log(row[0]);
                    if(password !== row[0].password) return done(null, false, {message: 'error pw'});
                    if(password === row[0].password) return done(null, row[0]);

                    // 알수없는 문제
                    console.log('trouble error in Session Sql');
                    done(null, false, {message: 'trouble error'});
                })
            })
        }
    ))
    return passport;
}
