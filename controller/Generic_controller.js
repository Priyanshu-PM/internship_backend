import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// Generic Controller
class GenericController {
  constructor(Model) {
    this.Model = Model;
  }

  getAll = async (req, res) => {
    try {
      const modelInstance = new this.Model();
      const data = await modelInstance.getAll();
      res.json({ success: true, data: data[0] });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };


  getByUsername = catchAsyncErrors(async (req, res) => {
    const modelInstance = new this.Model();
    const { username } = req.params;
    // console.log("USERNAME IS : ", username);
    const data = await modelInstance.getByUsername(username);
    res.json({ success: true, data: data[0] });
  });

  create = catchAsyncErrors(async (req, res) => {
    const modelInstance = new this.Model();
    const newData = req.body;
    const result = await modelInstance.create(newData);
    res.json({ success: true, data: result });
  });

  updateByUsername = catchAsyncErrors(async (req, res) => {

    console.log("Update controller hit");

    const modelInstance = new this.Model();
    const { username, T_ID } = req.query;

    console.log("username is : ", username);
    const updatedFields = req.body;
    const result = await modelInstance.update(username, T_ID, updatedFields);
    res.json({ success: true, data: result });
  });

  deleteByUsername = catchAsyncErrors(async (req, res) => {
    const modelInstance = new this.Model();
    const { username, T_ID } = req.query;
    const result = await modelInstance.deleteByUsername(username, T_ID);
    res.json({ success: true, data: result });
  });
}

export default GenericController;
