module.exports = {
    isOwner(req, res){
        if(req.user) return true;
        if(!req.user) return false;
    },
    statusUI(req, res){
        let authStatusUI = '<a href="/login">login</a> <a href="/login/create">register</a>';
        if(this.isOwner(req, res)){
            authStatusUI = `${req.user.name} | <a href="/login/logout">logout</a>`;
            console.log(req.user);
        }
        return authStatusUI;
    }
}
