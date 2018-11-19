'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function saveAs(data, fileName, options) {
  if ( options === void 0 ) options = {};

  var save = postToProxy;

  if (options.forceProxy && !options.proxyURL) {
    throw new Error('No proxyURL is set, but forceProxy is true');
  }

  if (!options.forceProxy) {
    if (canDownload()) {
      save = saveAsDataURI;
    }

    if (navigator.msSaveBlob) {
      save = saveAsBlob;
    }
  }

  save(data, fileName, options);
}

var anchor = function () { return document.createElement('a'); };
var canDownload = function () { return 'download' in anchor(); };

function saveAsBlob(data, fileName) {
  var blob = data; // could be a Blob object

  if (typeof data === 'string') {
    var parts = data.split(';base64,');
    var contentType = parts[0];
    var base64 = atob(parts[1]);
    var array = new Uint8Array(base64.length);

    for (var idx = 0; idx < base64.length; idx++) {
      array[idx] = base64.charCodeAt(idx);
    }

    blob = new Blob([ array.buffer ], { type: contentType });
  }

  navigator.msSaveBlob(blob, fileName);
}

function saveAsDataURI(data, fileName) {
  var dataURI = data;
  if (window.Blob && data instanceof Blob) {
    dataURI = URL.createObjectURL(data);
  }

  var fileSaver = anchor();
  fileSaver.download = fileName;
  fileSaver.href = dataURI;

  var e = document.createEvent('MouseEvents');
  e.initMouseEvent('click', true, false, window,
  0, 0, 0, 0, 0, false, false, false, false, 0, null);

  fileSaver.dispatchEvent(e);
  setTimeout(function () { return URL.revokeObjectURL(dataURI); });
}

function postToProxy(dataURI, fileName, options) {
  if (!options.proxyURL) {
    return;
  }

  var form = document.createElement('form');
  form.setAttribute('action', options.proxyURL);
  form.setAttribute('method', 'POST');
  form.setAttribute('target', options.proxyTarget || '_self');

  var formData = options.proxyData || {};
  formData.fileName = fileName;

  var parts = dataURI.split(";base64,");
  formData.contentType = parts[0].replace("data:", "");
  formData.base64 = parts[1];

  for (var name in formData) {
    if (formData.hasOwnProperty(name)) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', name);
      input.setAttribute('value', formData[name]);

      form.appendChild(input);
    }
  }

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

var KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var fromCharCode = String.fromCharCode;

function encodeBase64(plainText) {
  var input = encodeUTF8(plainText);
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;

  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output = output +
      KEY_STR.charAt(enc1) + KEY_STR.charAt(enc2) +
      KEY_STR.charAt(enc3) + KEY_STR.charAt(enc4);
  }

  return output;
}

function encodeUTF8(input) {
  var output = "";

  for (var i = 0; i < input.length; i++) {
    var c = input.charCodeAt(i);

    if (c < 0x80) {
      // One byte
      output += fromCharCode(c);
    } else if (c < 0x800) {
      // Two bytes
      output += fromCharCode(0xC0 | (c >>> 6));
      output += fromCharCode(0x80 | (c & 0x3f));
    } else if (c < 0x10000) {
      // Three bytes
      output += fromCharCode(0xE0 | (c >>> 12));
      output += fromCharCode(0x80 | (c >>> 6 & 0x3f));
      output += fromCharCode(0x80 | (c & 0x3f));
    }
  }

  return output;
}

exports.saveAs = saveAs;
exports.encodeBase64 = encodeBase64;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi91c3IvbG9jYWwvamVua2lucy93b3Jrc3BhY2Uva2VuZG8tZmlsZS1zYXZlcl9yZWxlYXNlL3NyYy9zYXZlLWFzLmpzIiwiL3Vzci9sb2NhbC9qZW5raW5zL3dvcmtzcGFjZS9rZW5kby1maWxlLXNhdmVyX3JlbGVhc2Uvc3JjL2Jhc2U2NC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gc2F2ZUFzKGRhdGEsIGZpbGVOYW1lLCBvcHRpb25zID0ge30pIHtcbiAgbGV0IHNhdmUgPSBwb3N0VG9Qcm94eTtcblxuICBpZiAob3B0aW9ucy5mb3JjZVByb3h5ICYmICFvcHRpb25zLnByb3h5VVJMKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBwcm94eVVSTCBpcyBzZXQsIGJ1dCBmb3JjZVByb3h5IGlzIHRydWUnKTtcbiAgfVxuXG4gIGlmICghb3B0aW9ucy5mb3JjZVByb3h5KSB7XG4gICAgaWYgKGNhbkRvd25sb2FkKCkpIHtcbiAgICAgIHNhdmUgPSBzYXZlQXNEYXRhVVJJO1xuICAgIH1cblxuICAgIGlmIChuYXZpZ2F0b3IubXNTYXZlQmxvYikge1xuICAgICAgc2F2ZSA9IHNhdmVBc0Jsb2I7XG4gICAgfVxuICB9XG5cbiAgc2F2ZShkYXRhLCBmaWxlTmFtZSwgb3B0aW9ucyk7XG59XG5cbmNvbnN0IGFuY2hvciA9ICgpID0+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbmNvbnN0IGNhbkRvd25sb2FkID0gKCkgPT4gJ2Rvd25sb2FkJyBpbiBhbmNob3IoKTtcblxuZnVuY3Rpb24gc2F2ZUFzQmxvYihkYXRhLCBmaWxlTmFtZSkge1xuICBsZXQgYmxvYiA9IGRhdGE7IC8vIGNvdWxkIGJlIGEgQmxvYiBvYmplY3RcblxuICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgcGFydHMgPSBkYXRhLnNwbGl0KCc7YmFzZTY0LCcpO1xuICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gcGFydHNbMF07XG4gICAgY29uc3QgYmFzZTY0ID0gYXRvYihwYXJ0c1sxXSk7XG4gICAgY29uc3QgYXJyYXkgPSBuZXcgVWludDhBcnJheShiYXNlNjQubGVuZ3RoKTtcblxuICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGJhc2U2NC5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICBhcnJheVtpZHhdID0gYmFzZTY0LmNoYXJDb2RlQXQoaWR4KTtcbiAgICB9XG5cbiAgICBibG9iID0gbmV3IEJsb2IoWyBhcnJheS5idWZmZXIgXSwgeyB0eXBlOiBjb250ZW50VHlwZSB9KTtcbiAgfVxuXG4gIG5hdmlnYXRvci5tc1NhdmVCbG9iKGJsb2IsIGZpbGVOYW1lKTtcbn1cblxuZnVuY3Rpb24gc2F2ZUFzRGF0YVVSSShkYXRhLCBmaWxlTmFtZSkge1xuICBsZXQgZGF0YVVSSSA9IGRhdGE7XG4gIGlmICh3aW5kb3cuQmxvYiAmJiBkYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgIGRhdGFVUkkgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGRhdGEpO1xuICB9XG5cbiAgY29uc3QgZmlsZVNhdmVyID0gYW5jaG9yKCk7XG4gIGZpbGVTYXZlci5kb3dubG9hZCA9IGZpbGVOYW1lO1xuICBmaWxlU2F2ZXIuaHJlZiA9IGRhdGFVUkk7XG5cbiAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpO1xuICBlLmluaXRNb3VzZUV2ZW50KCdjbGljaycsIHRydWUsIGZhbHNlLCB3aW5kb3csXG4gIDAsIDAsIDAsIDAsIDAsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsKTtcblxuICBmaWxlU2F2ZXIuZGlzcGF0Y2hFdmVudChlKTtcbiAgc2V0VGltZW91dCgoKSA9PiBVUkwucmV2b2tlT2JqZWN0VVJMKGRhdGFVUkkpKTtcbn1cblxuZnVuY3Rpb24gcG9zdFRvUHJveHkoZGF0YVVSSSwgZmlsZU5hbWUsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zLnByb3h5VVJMKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicsIG9wdGlvbnMucHJveHlVUkwpO1xuICBmb3JtLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgJ1BPU1QnKTtcbiAgZm9ybS5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsIG9wdGlvbnMucHJveHlUYXJnZXQgfHwgJ19zZWxmJyk7XG5cbiAgY29uc3QgZm9ybURhdGEgPSBvcHRpb25zLnByb3h5RGF0YSB8fCB7fTtcbiAgZm9ybURhdGEuZmlsZU5hbWUgPSBmaWxlTmFtZTtcblxuICBjb25zdCBwYXJ0cyA9IGRhdGFVUkkuc3BsaXQoXCI7YmFzZTY0LFwiKTtcbiAgZm9ybURhdGEuY29udGVudFR5cGUgPSBwYXJ0c1swXS5yZXBsYWNlKFwiZGF0YTpcIiwgXCJcIik7XG4gIGZvcm1EYXRhLmJhc2U2NCA9IHBhcnRzWzFdO1xuXG4gIGZvciAobGV0IG5hbWUgaW4gZm9ybURhdGEpIHtcbiAgICBpZiAoZm9ybURhdGEuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdoaWRkZW4nKTtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsIG5hbWUpO1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGZvcm1EYXRhW25hbWVdKTtcblxuICAgICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgfVxuICB9XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcbiAgZm9ybS5zdWJtaXQoKTtcbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChmb3JtKTtcbn1cblxuIiwiY29uc3QgS0VZX1NUUiA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIjtcbmNvbnN0IGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmNvZGVCYXNlNjQocGxhaW5UZXh0KSB7XG4gIGNvbnN0IGlucHV0ID0gZW5jb2RlVVRGOChwbGFpblRleHQpO1xuICBsZXQgb3V0cHV0ID0gXCJcIjtcbiAgbGV0IGNocjEsIGNocjIsIGNocjMsIGVuYzEsIGVuYzIsIGVuYzMsIGVuYzQ7XG4gIGxldCBpID0gMDtcblxuICB3aGlsZSAoaSA8IGlucHV0Lmxlbmd0aCkge1xuICAgIGNocjEgPSBpbnB1dC5jaGFyQ29kZUF0KGkrKyk7XG4gICAgY2hyMiA9IGlucHV0LmNoYXJDb2RlQXQoaSsrKTtcbiAgICBjaHIzID0gaW5wdXQuY2hhckNvZGVBdChpKyspO1xuXG4gICAgZW5jMSA9IGNocjEgPj4gMjtcbiAgICBlbmMyID0gKChjaHIxICYgMykgPDwgNCkgfCAoY2hyMiA+PiA0KTtcbiAgICBlbmMzID0gKChjaHIyICYgMTUpIDw8IDIpIHwgKGNocjMgPj4gNik7XG4gICAgZW5jNCA9IGNocjMgJiA2MztcblxuICAgIGlmIChpc05hTihjaHIyKSkge1xuICAgICAgZW5jMyA9IGVuYzQgPSA2NDtcbiAgICB9IGVsc2UgaWYgKGlzTmFOKGNocjMpKSB7XG4gICAgICBlbmM0ID0gNjQ7XG4gICAgfVxuXG4gICAgb3V0cHV0ID0gb3V0cHV0ICtcbiAgICAgIEtFWV9TVFIuY2hhckF0KGVuYzEpICsgS0VZX1NUUi5jaGFyQXQoZW5jMikgK1xuICAgICAgS0VZX1NUUi5jaGFyQXQoZW5jMykgKyBLRVlfU1RSLmNoYXJBdChlbmM0KTtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGVuY29kZVVURjgoaW5wdXQpIHtcbiAgbGV0IG91dHB1dCA9IFwiXCI7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGMgPSBpbnB1dC5jaGFyQ29kZUF0KGkpO1xuXG4gICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAvLyBPbmUgYnl0ZVxuICAgICAgb3V0cHV0ICs9IGZyb21DaGFyQ29kZShjKTtcbiAgICB9IGVsc2UgaWYgKGMgPCAweDgwMCkge1xuICAgICAgLy8gVHdvIGJ5dGVzXG4gICAgICBvdXRwdXQgKz0gZnJvbUNoYXJDb2RlKDB4QzAgfCAoYyA+Pj4gNikpO1xuICAgICAgb3V0cHV0ICs9IGZyb21DaGFyQ29kZSgweDgwIHwgKGMgJiAweDNmKSk7XG4gICAgfSBlbHNlIGlmIChjIDwgMHgxMDAwMCkge1xuICAgICAgLy8gVGhyZWUgYnl0ZXNcbiAgICAgIG91dHB1dCArPSBmcm9tQ2hhckNvZGUoMHhFMCB8IChjID4+PiAxMikpO1xuICAgICAgb3V0cHV0ICs9IGZyb21DaGFyQ29kZSgweDgwIHwgKGMgPj4+IDYgJiAweDNmKSk7XG4gICAgICBvdXRwdXQgKz0gZnJvbUNoYXJDb2RlKDB4ODAgfCAoYyAmIDB4M2YpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuIl0sIm5hbWVzIjpbImxldCIsImNvbnN0Il0sIm1hcHBpbmdzIjoiOzs7O0FBQU8sU0FBUyxNQUFNLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFZLEVBQUU7bUNBQVAsR0FBRyxFQUFFOztFQUNqREEsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDOztFQUV2QixJQUFJLE9BQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO0lBQzNDLE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztHQUMvRDs7RUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtJQUN2QixJQUFJLFdBQVcsRUFBRSxFQUFFO01BQ2pCLElBQUksR0FBRyxhQUFhLENBQUM7S0FDdEI7O0lBRUQsSUFBSSxTQUFTLENBQUMsVUFBVSxFQUFFO01BQ3hCLElBQUksR0FBRyxV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