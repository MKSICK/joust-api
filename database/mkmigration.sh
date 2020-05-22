#!/bin/sh
read -p "Enter migration name (lowercase, underscores and dashes): "  MIGNAME
NUM=`ls ./sql| tail -n1 | cut -c1-6 | sed 's/^0*//'`
NUM_NEXT="$(($NUM + 1))"
NUM_PAD=`printf %06d $NUM_NEXT`
FILENAME=$NUM_PAD-$MIGNAME.sql
CURRENT_DATE=`date +%FT%T%z`
echo "-- $CURRENT_DATE" >> ./sql/$FILENAME
echo "LOCK TABLES \`migrations\` WRITE;" >> ./sql/$FILENAME
echo "INSERT INTO \`migrations\` (\`name\`, \`num\`) VALUES ('$FILENAME', $NUM_NEXT);" >> ./sql/$FILENAME
echo "UNLOCK TABLES;" >> ./sql/$FILENAME