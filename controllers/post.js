const Post =require('../models/post')

const Comment =require('../models/comment');


//to add post or comment in the database
module.exports.post_content =async function(req,res){
    // normal method    
    //Post.create({
        //    content : req.body.content,
        //    user :req.user._id
        //},function(err){
        //    if(err){
        //        console.log('error in creating user while posting');
        //        return
        //    }
        //        return res.redirect('back');
        //}
        //)

        //using async wait method
        try{
            await Post.create({
                   content : req.body.content,
                    user :req.user._id
                })
            req.flash('success','POST PUBLISHED!');
            return res.redirect('back');
        }catch(err){
            req.flash('error',err);
            //console.log('Error',err);
            return redirect('back')

        }

}

// to delete a post and comments associated with it
module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();
            // now we also delete all the comments associated with it so we require the 'Comment' model
            Comment.deleteMany({post: req.params.id},function(err){
                req.flash('success','POST ASSOCIATED COMMENTS DELETED');
                return res.redirect('back');
            })
        }
        else{
            //console.log('user is not same')
            req.flash('error','YOU CANNOT DELETE POST');
            return res.redirect('back');
        }
    })


}

 // to delete a post and comments associated with it  but this time using async wait method
    //module.exports.destroy = async function(req,res){
    //    try{
    //        let post= await Post.findById(req.params.id);

    //        if(post.user == req.user.id){
    //            post.remove();

    //            await  Comment.deleteMany({post: req.params.id});
    //            return res.redirect('back');
    //            }
    //    }catch(err){
    //        console.log("error",err);
    //        return
    //}
//}
