find . -type f -name "_desc.json" -print | while read file_name
do
    content="`cat $file_name`"
    basename=$(basename $file_name)
    echo '{' > "$basename.tmp"
    #echo -e '\t' >> "$basename.tmp"
    echo -e '\t"diagnosis": "'$content'"' >> "$basename.tmp"
    #echo "$content" >> "$basename.tmp"
    #echo '"' >> "$basename.tmp"
    echo '}' >> "$basename.tmp"
    #echo "/* $basename */" > "$basename.tmp"
    #cat "$file_name" >> "$basename.tmp"
    mv "$basename.tmp" "$file_name"
done