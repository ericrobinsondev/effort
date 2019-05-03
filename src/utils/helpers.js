export const sendErrorMessage = (error, res) => {
  error.message === 'Unauthorized'
    ? res.status(401).json({
        error: "You don't have permission to access."
      })
    : res.status(400).end();
};
