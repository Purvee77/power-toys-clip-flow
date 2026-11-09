Set shell = CreateObject("WScript.Shell")
currentDir = "C:\Users\User\Documents\Predictive_AI\smart-clipboard"
shell.CurrentDirectory = currentDir
shell.Run "node """ & currentDir & "\index.js""", 0, False
