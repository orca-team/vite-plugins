#!/usr/bin/env bash

echo "running emit-log"

# 取出 log.txt 的文件内容
log=$(cat log.txt|grep 'New tag:')

echo $log

# 如果 log.txt 为空
if [ -z "$log" ]; then
  curl 'https://oapi.dingtalk.com/robot/send?access_token=${DING_TOKEN}' \
   -H 'Content-Type: application/json' \
   -d '{"msgtype": "markdown","markdown": {"title":"orca-fe发布通知","text":"### @orca-fe/vite-plugins\n流水线结束，没有新的模块发布"}}'
  exit 0
fi

# 如果 log.txt 不为空，则将 log 作为消息发出去，需要将 log 的换行符替换为 \n
log=${log//$'\n'/\\n}
echo $log
echo $DING_TOKEN
curl 'https://oapi.dingtalk.com/robot/send?access_token=${DING_TOKEN}' \
   -H 'Content-Type: application/json' \
   -d '{"msgtype": "markdown","markdown": {"title":"orca-fe发布通知","text":"### @orca-fe/vite-plugins\n流水线结束，以下模块已发布：\n'"$log"'"}}'

