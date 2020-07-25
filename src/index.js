const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const marked = require("marked");
const templatePath = "./src/template/begin.md";
const targetPath = "./output";
const html2Docx = require("html-docx-js");
const cheerio = require("cheerio");
(async () => {
  try {
    const tempResult = await renderFile(templatePath, { isInner: false });
    // 生成markdown
    renderMarkdown(path.resolve(targetPath, "begin.md"), tempResult);
    // 输出word
    renderMarkdownToWord(
      path.resolve(targetPath, "begin.md"),
      path.resolve(targetPath, "begin.docx")
    );
  } catch (error) {
    console.error(error);
  }
})();

/**
 * @description 替换模板文件中的变量
 * @param {*} tempPath 模板路劲
 * @param {*} options  需要替换的变量
 */
function renderFile(tempPath, options) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(tempPath, options, function (err, result) {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

/**
 * @param {String} outputPath 输出文件的路径
 */
function renderMarkdown(outputPath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(outputPath, content, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

/**
 *
 * @param {*} markdownPath markdown的路径
 * @param {*} outputPath 输出路径
 */
function renderMarkdownToWord(markdownPath, outputPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(markdownPath, "utf8", function (err, file) {
      if (err) {
        reject(err);
        return;
      }
      const result = getHtml(marked(file));
      const $ = cheerio.load(result);
      $("img").each((index, img) => {
        $(img).attr("src", renderImgToBase64(path.resolve(targetPath,$(img).attr("src"))));
      });
      fs.writeFile(outputPath, html2Docx.asBlob($.html()), (fsErr) => {
        if (fsErr) {
          reject(fsErr);
          return;
        }
        resolve();
      });
    });
  });
}
/**
 * 
 * @param {*} template 渲染内容
 */
function getHtml(template) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style>
            .markdown-body {
                box-sizing: border-box;
                min-width: 200px;
                max-width: 980px;
                margin: 0 auto;
                padding: 45px;
            }
            @media (max-width: 767px) {
                .markdown-body {
                    padding: 15px;
                }
            }
            {{{style}}}
        </style>
    </head>
    <body>
        <div class="markdown-body">
            ${template}
        </div>
    </body>
    </html>
`;
}

/**
 *
 * @param {*} imgPath 图片路径
 */
function renderImgToBase64(imgPath) {
  let bitmap = fs.readFileSync(imgPath);
  return (
    "data:image/png;base64," + Buffer.from(bitmap, "binary").toString("base64")
  ); // base64编码
}
