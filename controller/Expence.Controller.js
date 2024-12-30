import Expence from "../models/Expence.Model.js";

export const addexpence =async (req,res)=>{
    const { name, amount, date,description } = req.body;
    
    try{
        const newexpence = await Expence.create({
            name: name,
            amount: amount,
            date: date,
            description: description,
          })
          res.status(200).json({ message: newexpence });
    }
    catch(err){
        console.log("Signup error: " + err);
        res.status(500).json({message: err.message})
    } 
}

export const Viewexpence = async (req, res) => {

    try {
  
      const allexpence = await Expence.find({ user: req.user.id })
  
      return res.status(200).json(allexpence);
  
    }
    catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
export const ViewSingleexpence = async (req, res) => {
  const { id } = req.params; 
    try {
  
      const singleexpence = await Expence.findById(id)
  
      return res.status(200).json(singleexpence);
  
    }
    catch (err) {
      res.status(404).json({ message: err.message });
    }
  }


  export const updateExpense = async (req, res) => {
    const { name, price, date, description } = req.body; 
    const { id } = req.params; 
    try {
      
      if (!id) {
        return res.status(400).json({ message: "Expense ID is required", isSuccess: false });
      }
        const existingExpense = await Expence.findById(id);
      if (!existingExpense) {
        return res.status(404).json({ message: "Expense not found", isSuccess: false }); 
      }
  
      const updateData = { name, price, date, description };
  
      const updatedExpense = await Expence.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updatedExpense) {
        return res.status(500).json({ message: "Failed to update expense", isSuccess: false });
      }
  
      res.status(200).json({ message: "Expense updated successfully", data: updatedExpense, isSuccess: true });
  
    } catch (err) {
      res.status(500).json({ message: err.message, isSuccess: false });
    }
  };
  