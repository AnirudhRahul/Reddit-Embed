var concat = require('concat')
const { minify } = require("terser");
var fs = require("fs")

async function minify_bundle(){
  const result = await minify(fs.readFileSync("dist/bundle.js", "utf8"),
  {
    sourceMap: false,
    mangle:{
      reserved: ["red", "he"],
      keep_fnames: true
    },
    format: {
      preamble: "/* https://github.com/AnirudhRahul/Reddit-Embed v1.1.1 by @anirudhrahul | MIT license */"
    }
  });
  fs.writeFileSync("dist/bundle.min.js", result.code)
}

concat(['src/he.js', 'src/red.js'], 'dist/bundle.js')
.then(()=>{
  minify_bundle()
})
