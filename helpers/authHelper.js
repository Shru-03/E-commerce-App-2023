import bycrpt from "bcrypt"

// password hashing
export const hashPassword=async(password)=>{
    try {
        const saltRounds=10;
        const hashedPassword=await bycrpt.hash(password,saltRounds)  
        return hashedPassword;
    } catch (error) {
        console.log(error)
    }
}

// comparing passwords
export const comparePassword= async (password,hashedPassword)=>{
      return bycrpt.compare(password,hashedPassword)
}