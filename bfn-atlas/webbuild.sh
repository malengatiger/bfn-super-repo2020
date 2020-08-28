#!/usr/bin/env bash
echo "🐸 🐸 🐸 BUILD BFN DOCKER IMAGE and ship to Google Cloud ... 🍋 "
./gradlew clean build  -x test
echo "🐸 🐸 🐸 Copying BFN webserver jar to dockerbuild ... 🍋 "
cp clients/build/libs/clients-0.1.jar dockerbuild/
echo "🍋 Check that new jar has been properly copied 🍋 🍋 🍋 🍋 🍋 "
ls -all dockerbuild
echo "😡 😡 😡 Build local docker image from inside dockerbuild directory ... ... 😡 😡 😡 "
cd dockerbuild
echo "🍎 🍎 🍎 build local image, just to see if image OK"
#gcloud app deploy clients-0.1.jar
echo "🍎 🍎 🍎 build local image, just to see if image OK"
docker build -t gcr.io/bfn-mobile-backend/bfnwebapi3 .
echo "🌍 🌍 🌍 Submit docker image to Google Cloud Run ... 🌍 🌍 🌍 "
gcloud builds submit --tag gcr.io/bfn-mobile-backend/bfnwebapi3
echo "🍎 🍎 🍎 deploy container from image 😡 😡 😡 "
gcloud beta run deploy --image gcr.io/bfn-mobile-backend/bfnwebapi3 --platform managed
echo "🥬 🥬 🥬 🥬 Given a pinch of luck, we are DONE! - 🥬 🥬 🥬 🥬 time to test on  🍎 GCP! 🍎 "


