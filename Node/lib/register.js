module.exports = {
    isOwner(req, res){
        if(req.user) return true;
        if(!req.user) return false;
    },
    statusUI(req, res){
        let authStatusUI = '<a href="/login">login</a>';
        if(this.isOwner(req, res)){
            authStatusUI = `${req.user.email} | <a href="/login/logout">logout</a>`
        }
        return authStatusUI;
    }
}
