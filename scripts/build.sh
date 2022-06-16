echo "Building Portal v2"
export NODE_OPTIONS=--max-old-space-size=4096
export GENERATE_SOURCEMAP=false
CI=false yarn build