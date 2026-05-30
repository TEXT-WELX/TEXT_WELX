import { useState } from "react";
import { Play, Save, Download, Code } from "lucide-react";

export default function Playground() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

  const codeExamples = {
    javascript: `function greet(name) {
  return "Hello " + name;
}

console.log(greet("WelX"));`,
    python: `def greet(name):
    return "Hello " + name

print(greet("WelX"))`,
    java: `class Main {
    public static void main(String[] args) {
        System.out.println("Hello WelX");
    }
}`,
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello WelX";
    return 0;
}`,
    html: `<!DOCTYPE html>
<html>
<body>
<h2>Hello from WelX!</h2>
</body>
</html>`
  };

  const [code, setCode] = useState(codeExamples.javascript);

  const languages = [
    { id: "javascript", name: "JavaScript", icon: "🟨" },
    { id: "python", name: "Python", icon: "🐍" },
    { id: "java", name: "Java", icon: "☕" },
    { id: "cpp", name: "C++", icon: "⚡" },
    { id: "html", name: "HTML/CSS", icon: "🌐" },
  ];

  const selectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setCode(codeExamples[lang]);
    setOutput("");
  };

  const runCode = () => {
    if (selectedLanguage === "javascript") {
      try {
        const result = eval(code);
        setOutput(result || "Code executed successfully!");
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
    } else {
      setOutput(`Execution for ${selectedLanguage} coming soon...`);
    }
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `code.${selectedLanguage}`;
    element.click();
  };

  return (
    <div className="playground-container">

      {/* HEADER */}
      <header className="top-bar">
        <div className="title-wrap">
          <Code size={20} />
          <h1>WelX Code Playground</h1>
        </div>

        <div className="actions">
          <button onClick={runCode} className="btn-run">
            <Play size={14} /> Run
          </button>
          <button onClick={() => alert("Saved!")} className="btn-gray">
            <Save size={14} /> Save
          </button>
          <button onClick={downloadCode} className="btn-gray">
            <Download size={14} /> Download
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="workspace">

        {/* Language Selector */}
        <aside className="languages">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => selectLanguage(lang.id)}
              className={`lang-btn ${
                selectedLanguage === lang.id ? "active" : ""
              }`}
            >
              {lang.icon} {lang.name}
            </button>
          ))}
        </aside>

        {/* Editor */}
        <textarea
          className="editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
        />

        {/* Output Terminal */}
        <pre className="terminal">
          {output || "Run code to see output..."}
        </pre>
      </div>

      {/* EXTRAS */}
      <section className="extras">
        <div className="examples">
          <h3>Try Example Projects</h3>
          <p>Click any to auto-load code</p>
          <ul>
            {Object.keys(codeExamples).map((lang) => (
              <li
                key={lang}
                onClick={() => selectLanguage(lang)}
              >
                {lang.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>

        <div className="points-box">
          Earn WelX Points every time you build and save your code!
        </div>
      </section>

      {/* Glowing Cursor */}
      <div className="custom-cursor" />
    </div>
  );
}
