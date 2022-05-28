echo "Checking Node Version"
sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
sudo nvm install 14
sudo npm i -g yarn
yarn
npm rebuild node-sass
echo "Node Version Check Complete"
