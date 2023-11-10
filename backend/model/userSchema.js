const mongoose= require('mongoose');
const {Schema }= mongoose;
const JWT= require("jsonwebtoken")
const bcrpt=require('bcrypt');

const userSchema= new Schema({
    name:{
        type:String,
        require:[true,'User name is Required'],
        minLength:[5,'Name must be at least 5 char'],
        maxLength:[50,'Name must be at least 50 char'],
        trim:true
    },
    email:{
        type:String,
        require:[true,'User email is Required'],
        unique:true,
        lowercase:true,
        unique:[true, 'Already registered']
    },
    password:{
        type:String, 
        select:false  
    },
    forgotPasswordToken:{
        type:String,
    },
    forgotPasswordExpiryDate:{
        type:Date,
    }
},{
    timestamps:true
});
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password= await bcrpt.hash(this.password,10);
    return next();
})
userSchema.methods={
    jwtToken(){
        return JWT.sign(
            {id : this._id, email: this.email},
            process.env.SECRET,
            {expiresIn:'24h'}
        )
    }
}
const userModel= mongoose.model('user', userSchema);
module.exports=userModel;