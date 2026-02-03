const dashboard = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Welcome to Admin Dashboard 🧑💼',
            admin: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role
            },
            dashboard: {
                totalStudents: 0,
                coursesAssigned: 0,
                assignmentsToCheck: 0,
                notices: []
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { dashboard };
