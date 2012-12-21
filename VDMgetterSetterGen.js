function genSelectGetSet() {
  var document = new ActiveXObject('htmlfile');
  var window = document.parentWindow;
  var copyStr = window.clipboardData.getData('text');
  
  // 最初にコロンがあった場所 = 型名とのセパレータとして
  var colonPos = copyStr.indexOf(':');
  // インスタンス変数 - 名
  var insVarName = copyStr.substring(0, copyStr.indexOf(':')).replace(/^\s+|\s+$/g, "");
  // インスタンス変数 - 型
  var typeEndPos = copyStr.indexOf(':', colonPos + 1);
  if (typeEndPos == -1) {
    typeEndPos = copyStr.indexOf(';', colonPos + 1);
  }
  
  var insVarType = copyStr.substring(colonPos + 1, typeEndPos).replace(/^\s+|\s+$/g, "");
  // インスタンス変数の1文字目を大文字に
  var upperCopyStr = insVarName.charAt(0).toUpperCase() + insVarName.substring(1);
  
  // getter, setter挿入
  var getterPrefix = "get";
  
  if (insVarType == "bool") {
    getterPrefix = "is";
  }

  Editor.InsText("  public " + getterPrefix + upperCopyStr + " : () ==> " + insVarType + "\r\n");
  Editor.InsText("  " + getterPrefix + upperCopyStr + "() == return " + insVarName + ";\r\n");
  
  Editor.InsText("  \r\n");
  
  Editor.InsText("  public set" + upperCopyStr + " : " + insVarType + " ==> ()\r\n");
  Editor.InsText("  set" + upperCopyStr + "(a" + upperCopyStr + ") == " + insVarName + " := a" + upperCopyStr + ";\r\n");
}

genSelectGetSet()


