function find_crush() {
    // get email and password from the form
    const fc_button = document.getElementById('find_crush_button');
    fc_button.disabled = true;
    fc_button.innerHTML = 'Đang tìm kiếm...';
    const url = 'https://newsandstory.herokuapp.com/api/v1/find_crush';
    fullname = document.getElementById('fullname').value;
    class_name = document.getElementById('class').value;
    formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('class', class_name);
    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.status == 'success') {
                crush_div = document.getElementById('crush_div');
                try {
                    document.getElementById('result_box').remove();
                }
                catch (e) {
                    console.log();                
                }
                result_div = document.createElement('div');
                result_div.className = 'result_box';
                result_div.id = 'result_box';
                ul_result = document.createElement('ul');
                ul_result.className = 'result_list';
                ul_result.innerHTML = 'Những người thích người này:';
                for (crush of data.crush) {
                    li_result = document.createElement('li');
                    li_result.innerHTML = crush;
                    ul_result.appendChild(li_result);
                }
                result_div.appendChild(ul_result);
                crush_div.appendChild(result_div);
                fc_button.disabled = false;
                fc_button.innerHTML = 'Tìm kiếm';
            }
            else {
                alert(data.message);
            }
            fc_button.disabled = false;
            fc_button.innerHTML = 'Bắt đầu tìm kiếm :Đ';
    },
        error: function (xhr) {
            alert("Đã có lỗi khi kết nối đến máy chủ, mã lỗi: " + xhr.statusText + " " + xhr.status);
            fc_button.disabled = false;
            fc_button.innerHTML = 'Bắt đầu tìm kiếm :Đ';
        },
    });
}