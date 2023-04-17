<?php

$data = array(
    array(
        'type' => 'page'
        'title' => 'Pension pay dates and direct deposit'
        'description' => 'This page provides you with the latest PSPP pay schedule'
        // 'breadcrums' => array('Home', 'Retired members', 'Welcome to retirement')
        'date' => '2023-02-16 10:18:50'
        'image' => ''
    ),
    array(
        'type' => 'page'
        'title' => 'Overview'
        'description' => "Whether you're a retired member or a surviving spouse/beneficiary, there's some critical information you need to know about your pension benefits."
        'breadcrums' => array('Home', 'Retired members', 'Welcome to retirement')
        'date' => '2023-02-16 10:18:50'
        'image' => ''
    ),
    array(
        'type' => 'page'
        'title' => 'Retirement administration'
        'description' => 'Overview of the mechanics related to pension payments; i.e., pension formula, payment dates, CPP integration'
        'breadcrums' => array('Home', 'Retired members', 'Welcome to retirement')
        'date' => '2023-02-16 10:18:50'
        'image' => ''
    ),
    array(
        'type' => 'article'
        'category' => 'news'
        'title' => 'Cost-of-living increases for Retired Members'
        'description' => ''
        'date' => '2023-02-16 10:18:50',
        'image' => '../assets0215/img/img_search_01.jpg'
    ),
    array(
        'type' => 'article'
        'category' => 'news'
        'title' => 'Pensions to increase by 1.6 per cent for 2018 cost-of-living adjustment'
        'description' => ''
        'date' => '2023-02-16 10:18:50',
        'image' => '../assets0215/img/img_search_03.jpg'
    ),
    array(
        'type' => 'article'
        'category' => 'letter'
        'title' => 'Your 2023 cost-of-living adjustment'
        'description' => ''
        'date' => '2023-02-16 10:18:50',
        'image' => '../assets0215/img/img_search_02.jpg'
    ),
    array(
        'type' => 'article'
        'category' => 'blog'
        'title' => 'Pensions to increase by 1.3 percent for 2017 cost-of-living-adjustment'
        'description' => ''
        'date' => '2023-02-16 10:18:50',
        'image' => '../assets0215/img/img_search_04.jpg'
    ),
    array(
        'type' => 'article'
        'category' => 'letter'
        'title' => 'Pensions to increase by 2.2% on Jan 1, 2019'
        'description' => ''
        'date' => '2023-02-16 10:18:50'
        'image' => '../assets0215/img/img_search_05.jpg'
    ),
    array(
        'type' => 'form'
        'category' => 'opb'
        'name' => 'OPB Form',
        'code' => 'OPB1043'
        'title' => 'Application to Purchase Pension Credit'
        'link' => 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    ),
    array(
        'type' => 'form'
        'category' => 'fsco'
        'name' => 'FSCO / FSRA Waivers Form'
        'code' => 'FSCO-3'
        'title' => 'Waiver of Joint and Survivor Pension'
        'link' => 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    ),
    array(
        'type' => 'form'
        'category' => 'fsra',
        'name' => 'FSRA Family Law Form'
        'code' => 'FL-1'
        'title' => 'Application for Family Law Value'
        'link' => 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    ),
    array(
        'type' => 'form'
        'category' => 'cowan'
        'name' => 'Cowan Form'
        'code' => 'Cowan-1'
        'title' => 'Consent to Medical/Physical Information for Disability Pension (PDF)'
        'link' => 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    ),
    array(
        'type' => 'form'
        'category' => 'canada'
        'name' => 'Canada Life Form'
        'code' => 'M445D'
        'title' => 'Dental Benefits Claim for Legacy Plan: Premium Free (plan #157836)'
        'link' => 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    ),
    array(
        'type' => 'publication'
        'category' => 'booklet'
        'name' => 'Booklets'
        'title' => 'CPP Integration and your PSPP pension'
        'publish' => '2021'
        'link' => 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    ),
    array(
        'type' => 'publication'
        'category' => 'booklet'
        'name' => 'Booklets'
        'title' => 'Understanding Your Pension Credit'
        'publish' => '2021'
        'link' => 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    ),
    array(
        'type' => 'publication'
        'category' => 'flyer'
        'name' => 'Flyers and Brochures'
        'title' => 'Expert Commission on Pensions Submission'
        'publish' => '2021'
        'link' => 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    ),array(
        'type' => 'publication'
        'category' => 'flyer'
        'name' => 'Flyers and Brochures'
        'title' => 'Survivor pensions for a new spouse - for retired members'
        'publish' => '2021'
        'link' => 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    ),array(
        'type' => 'publication'
        'category' => 'flyer'
        'name' => 'Flyers and Brochures'
        'title' => 'Dividing pensions, the old rules'
        'publish' => '2021'
        'link' => 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    ),
);

// function getTotalData() {
//     return $data
// }

// function getAllData() {

// }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo json_encode($data);
    // if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
       
    //     if (isset($_GET['action'])) {
    //         $action = $_GET['action'];
    //         switch ($action) {
    //             case 'getData':
    //                 $result = getData();
    //                 echo json_encode($result);
    //                 break;
    //             case 'processData':
    //                 processData();
    //                 break;
    //             default:
    //                 header("HTTP/1.0 404 Not Found");
    //                 exit;
    //         }
    //     } else {
    //     header("HTTP/1.0 400 Bad Request");
    //     exit;
    //     }
    //     exit;
    // }
}
?>