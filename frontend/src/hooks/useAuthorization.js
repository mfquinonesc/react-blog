export default function useAuthorization(user, comment = null, post = null) {

    let edition = false;
    let admin = user?.userId == 1;

    if(user && user.rolId < 3 && comment && user.userId == comment.userId){
        edition = true;
    }

    if(user && user.rolId < 3 && post && user.userId == post.userId){
        edition = true;
    }

    if(user && user.rolId < 3 && !comment && !post){
        edition = true;
    }
        
    return { edition , admin }
}