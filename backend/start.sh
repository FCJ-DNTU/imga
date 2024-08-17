#!/bin/bash
imageNameFlag="--image"
containerNameFlag="--container"

imageName="my-image"
containerName="my-server"

for arg in "$@"
do
  IFS='=' read -r -a parts <<< "$arg"

  flag="${parts[0]}"
  value="${parts[1]}"

  case $flag in

    $imageNameFlag)
      imageName="$value"
      ;;

    $containerNameFlag)
      export containerName="$value"
      ;;

    *)
      println "The flag $flag isn't supported"
      ;;
  esac
done

docker build . -t "$imageName"
docker run -it -p 80:3000 --name "$containerName" "$imageName"