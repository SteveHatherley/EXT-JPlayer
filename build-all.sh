echo "#############################"
echo "#  Parsing JSBuild File     #"
echo "#############################"
echo "Executing: sencha build -p ./ext-jplayer-build.jsb3 -v;";

sencha build -p ext-jplayer-build.jsb3 -d builds -v;

echo "#############################"
echo "#  Building Docs via JSDuck #"
echo "#############################"
echo "Executing: jsduck --config=doc-build-cfg.json --output ./docs/;";
jsduck --config=doc-build-cfg.json --output ./docs/;