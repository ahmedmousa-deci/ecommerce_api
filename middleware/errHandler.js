async function errHandler(err, req, res, next) {
  console.log(err, err.name, err.message);
  res.status(400);
  res.json({
    code: 400,
    message: "bad request",
  });
}

export default errHandler;
