
export default async function (to, from, next) {
    document.title = `${to.name} - Goup`;
    
    if(to.name != 'Login' && to.name != 'Cadastro') {
        if(!localStorage.getItem('token'))
            next({name: 'Login'});
        else
            next();
    } else {
        if(localStorage.getItem('token'))
            next({path: '/dashboard'});
        else 
            next();
    } 
}