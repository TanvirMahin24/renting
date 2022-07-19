const Report = require("../../Model/Report.model");

// delete report
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }
    await report.destroy();
    res.status(200).json({
      message: "Report deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = deleteReport;
