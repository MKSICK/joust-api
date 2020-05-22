#!/bin/bash

mysql_query(){
    OUTPUT=$(mysql -u $DB_USER -p$DB_PASSWORD $DB_DATABASE -h $DB_HOST < $1 2>&1)
    # echo OUT: "$OUTPUT"
    if [ $? -eq 0 ]; then
        echo executed migration $1
    elif [[ $OUTPUT == *"ERROR 1062 (23000)"* ]] || [[ $OUTPUT == *"Table 'migrations' already exists"* ]]; then
        echo "Migration $1 is already applied"
    else
        echo OUTPUT '>>>>>>>>>>>>>>>>'
        echo $OUTPUT
        echo END OUTPUT '>>>>>>>>>>>>'
        echo Error occured applying migration $1! Evaluation required!
        exit 1
    fi
}

cd sql
for entry in "."/*
do
    FILENAME=$( echo $entry | cut -c3- )
    NUM=$( echo $entry | cut -c3-8 | sed 's/^0*//' )
    echo Trying to execute $FILENAME:$NUM
    mysql_query $FILENAME $NUM
    echo -----------------------
done
