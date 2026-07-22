echo "STARTING BUILD"

docker build -t react-img2 .

echo "BUILD COMPLETE"

docker run \
  --rm \
  -p 5174:5173 \
  -v "$(pwd)":/app\
  --name react-container2\
  react-img2