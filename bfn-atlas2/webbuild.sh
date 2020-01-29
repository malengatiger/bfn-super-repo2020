#!/usr/bin/env bash
echo "🐸 🐸 🐸 BUILD BFN DOCKER IMAGE and ship to Google Cloud ... 🍋 "
./gradlew clean build  -x test
echo "🐸 🐸 🐸 Copying BFN web server jar to dockerbuild ... 🍋 "
cp clients/build/libs/clients-0.1.jar dockerbuild/
cp clients/main/resources/dev-nodes.json dockerbuild/
cp clients/main/resources/prod-nodes.json dockerbuild/
echo "🍋 Check that new jar and node json have been properly copied 🍋 🍋 🍋 🍋 🍋 "
ls -all dockerbuild

echo " ...... "
echo "😡 😡 😡 Build local docker image from inside dockerbuild directory ... ... 😡 😡 😡 "
cd dockerbuild
#echo "🍎 🍎 🍎 deploy to appEngine"
#gcloud app deploy clients-0.1.jar
echo "🍎 🍎 🍎 build local image, just to see if image OK "
docker build -t gcr.io/bfn-mobile-backend/bfnwebapi3 .

echo " ...... "
echo "🌍 🌍 🌍 Submit INVESTOR docker image to Google Cloud Run ... 🌍 🌍 🌍 "
gcloud builds submit --tag gcr.io/bfn-mobile-backend/bfnwebinvestor
echo "🌍 🌍 🌍 Submit CUSTOMER docker image to Google Cloud Run ... 🌍 🌍 🌍 "
gcloud builds submit --tag gcr.io/bfn-mobile-backend/bfnwebcustomer

echo " ...... deploying new containers to Cloud Run for both investor and customer web servers"
echo "🍎 🍎 🍎 deploy INVESTOR container from image 😡 😡 😡 "
gcloud beta run deploy bfnwebinvestor --image gcr.io/bfn-mobile-backend/bfnwebinvestor --platform managed
echo "🍎 🍎 🍎 deploy CUSTOMER container from image 😡 😡 😡 "
gcloud beta run deploy bfnwebcustomer --image gcr.io/bfn-mobile-backend/bfnwebcustomer --platform managed

echo " ...... "
echo "🥬 🥬 🥬 🥬 Given a pinch of luck, we are DONE! - 🥬 🥬 🥬 🥬 time to test on  🍎 GCP! 🍎 "

