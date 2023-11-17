function status(request, response) {
  response.status(200).json({ message: "Clube Atlético Mineiro" });
}

export default status;
