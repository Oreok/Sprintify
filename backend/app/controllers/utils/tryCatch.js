// This function is used to catch errors in the controllers
export const tryCatch = (controller) => {
  return async (req, res) => {
    try {
      await controller(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message:
          "Es ist etwas schief gelaufen, probieren Sie es später noch einmal!",
      });
    }
  };
};

export default tryCatch;
