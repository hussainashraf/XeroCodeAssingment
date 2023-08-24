const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password: {
        type:String,
        required: true,
       
    },
    selectedOption: {
      type: String, // Store the selected option (e.g., Developer, Organization, Company)
      // default: '' // You can set a default value if needed
  },
  selectedValue: {
      type: String, // Store the input value associated with the selected option
      // default: '' // You can set a default value if needed
  }
  
})
userSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error("incorrect password");
    }
    throw Error("incorrect email");
  };
  
module.exports = mongoose.model('Users', userSchema)