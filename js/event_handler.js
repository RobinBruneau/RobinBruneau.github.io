document.addEventListener('DOMContentLoaded', domReady);

        function domReady() {
            new Dics({
                container: document.querySelectorAll('.b-dics')[0]
            });

            new Dics({
                container: document.querySelectorAll('.b-dics')[1],
                hideTexts: false,
                textPosition: "top"
            });

            new Dics({
                container: document.querySelectorAll('.b-dics')[2],
                hideTexts: false,
                textPosition: "top"
            });

            new Dics({
                container: document.querySelectorAll('.b-dics')[3],
                hideTexts: false,
                textPosition: "top"
            });

            new Dics({
                container: document.querySelectorAll('.b-dics')[4],
                hideTexts: false,
                textPosition: "top"
            });
        }

        function largeSceneEvent(idx) {
            let dics = document.querySelectorAll('.b-dics')[0]
            let sections = dics.getElementsByClassName('b-dics__section')
            let imagesLength = 3
            for (let i = 0; i < imagesLength; i++) {
                let image = sections[i].getElementsByClassName('b-dics__image-container')[0].getElementsByClassName('b-dics__image')[0]
                switch (idx) {
                    case 0:
                        image.src = 'assets/rnb_neus/images/color_mesh_normal/bear/';
                        break;
                    case 1:
                        image.src = 'assets/rnb_neus/images/color_mesh_normal/buddha/';
                        break;
                    case 2:
                        image.src = 'assets/rnb_neus/images/color_mesh_normal/cow/';
                        break;
                    case 3:
                        image.src = 'assets/rnb_neus/images/color_mesh_normal/pot2/';
                        break;
                    case 4:
                        image.src = 'assets/rnb_neus/images/color_mesh_normal/reading/';
                        break;
                }
                switch (i) {
                    case 0:
                        image.src = image.src + '/rgb.png';
                        break;
                    case 1:
                        image.src = image.src + '/mesh.png';
                        break;
                    case 2:
                        image.src = image.src + '/normal.png';
                        break;
                }
            }

            scene_list = document.getElementById("large-scale-recon-1").children;
            for (let i = 0; i < scene_list.length; i++) {
                if (idx == i) {
                    scene_list[i].children[0].className = "nav-link active"
                }
                else {
                    scene_list[i].children[0].className = "nav-link"
                }
            }
            scene_list = document.getElementById("large-scale-recon-2").children;
            for (let i = 0; i < scene_list.length; i++) {
                if (idx == i+2) {
                    scene_list[i].children[0].className = "nav-link active"
                }
                else {
                    scene_list[i].children[0].className = "nav-link"
                }
            }
        }

        function objectSceneEvent(idx) {
            let dics = document.querySelectorAll('.b-dics')[1]
            let sections = dics.getElementsByClassName('b-dics__section')
            let imagesLength = 3
            for (let i = 0; i < imagesLength; i++) {
                let image = sections[i].getElementsByClassName('b-dics__image-container')[0].getElementsByClassName('b-dics__image')[0]
                switch (idx) {
                    case 0:
                        image.src = 'assets/rnb_neus/images/cmp_methods/bear/';
                        break;
                    case 1:
                        image.src = 'assets/rnb_neus/images/cmp_methods/buddha/';
                        break;
                    case 2:
                        image.src = 'assets/rnb_neus/images/cmp_methods/cow/';
                        break;
                    case 3:
                        image.src = 'assets/rnb_neus/images/cmp_methods/pot2/';
                        break;
                    case 4:
                        image.src = 'assets/rnb_neus/images/cmp_methods/reading/';
                        break;
                }
                switch (i) {
                    case 0:
                        image.src = image.src + '/kaya.png';
                        break;
                    case 1:
                        image.src = image.src + '/ours.png';
                        break;
                    case 2:
                        image.src = image.src + '/mvpsnet.png';
                        break;
                }
            }

            let scene_list = document.getElementById("object-scale-recon").children;
            for (let i = 0; i < scene_list.length; i++) {
                if (idx == i) {
                    scene_list[i].children[0].className = "nav-link active"
                }
                else {
                    scene_list[i].children[0].className = "nav-link"
                }
            }
        }