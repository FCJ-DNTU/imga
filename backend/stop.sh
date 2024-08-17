#!/bin/bash
containerNameFlag="--container"
canRemoveFlag="--remove"

containerName="my-server"
canRemove=false

for arg in "$@"
do
  IFS='=' read -r -a parts <<< "$arg"

  flag="${parts[0]}"
  value="${parts[1]}"

  case $flag in

    $containerNameFlag)
      containerName="$value"
      ;;

    $canRemoveFlag)
      canRemove=true
      ;;

    *)
      println "The flag $flag isn't supported"
      ;;
  esac
done

docker container stop "$containerName"

if [[ "$canRemove" = true ]]
then
  docker container rm "$containerName"
fi