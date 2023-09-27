/* Document Ready
 ********************************************** */
jQuery(document).ready(function ($) {
  var t = $;

  var pathOne = window.location.pathname.split("/");

  var originPathOne = window.location.origin + "/" + pathOne[1];
  // var originPathOne = window.location.origin;

  let searchjson = originPathOne + "/search/search.json";

  let searchParams = new URLSearchParams(window.location.search);
  let newURL = new URL(window.location.href);

  if ($("#content").attr("data-page") != undefined) {
    var pagesType = $("#content").data("page");
  }

  function appHeight() {
    const doc = document.documentElement;
    doc.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
  }

  const limit = 20;
  let page = 1;
  let localValue = "";
  let isCustomized = false;

  const type = {
    all: "All",
    page: "Pages",
    forms: "Forms",
    publications: "Publications",
    articles: "Articles",
  };
  const typeNumber = {
    all: "01",
    page: "02",
    forms: "03",
    publications: "04",
    articles: "05",
  };

  let typeActive = "all";
  window.addEventListener("resize", appHeight);
  appHeight();
  if (pagesType == "form" || pagesType == "publications") {
    if (pagesType == "form") {
      typeActive = "forms";
    } else {
      typeActive = "publications";
    }
    if (searchParams.has("type")) {
      let typeCate = searchParams.get("cate"),
        typeName = searchParams.get("group"),
        typeActive = searchParams.get("type"),
        textSearch = searchParams.get("s");
      $("#search-data").val(textSearch);
      searchByType(typeActive, typeCate, null, typeName);
    } else {
      searchByType(typeActive);
    }
  } else {
    getTotal();
    if (searchParams.get("s") === "undefined") {
      searchParams.delete("s");
    }
  }

  // $(".c-tab-menu_list li:first-child").addClass("item-active");
  headerSearch0215();
  headerSearch0216();
  homepage0215();
  initEvent();
  // search0215();
  // searchAll();
  let isInitialSearch = false;

  $("#search-data, #search-data2, #search-data3").keypress(function (event) {
    if (event.which === 13) {
      page = 1;
      let inputId = event.target.id;
      let searchValue = localStorage.getItem("searchValue");
      let $input = $("#search-page-form .opb-form-text");

      if (!$input.val()) {
        localStorage.setItem("changePage", true);
      } else {
        localStorage.removeItem("changePage");
      }
      let changePage = localStorage.getItem("changePage");
      if (changePage !== null) {
        localStorage.removeItem("changePage");
        $(".c-tab-menu_list li:first-child").removeClass("item-active");
      }
      if (searchValue == null) {
        searchValue = $("#search-header .opb-form-text").val();
        localStorage.setItem("searchValue", searchValue);
      } else {
        localStorage.setItem("changePage", true);

        // $(".c-tab-menu_list li:first-child").removeClass("item-active");
      }

      if (inputId === "search-data") {
        if (searchValue) {
          localStorage.removeItem("changePage");
        }
        localStorage.removeItem("searchValue");
        localStorage.setItem("searchValue", $("#search-data").val());
      } else if (inputId === "search-data3") {
        localStorage.removeItem("searchValue");
        searchValue = $(
          ".search-header-from #search-header .opb-form-text"
        ).val();
        localStorage.setItem("searchValue", searchValue);
        currentURL = $(location).attr("href");
        if (currentURL.localeCompare(originPathOne + "/search/") !== 0) {
          searchValue = $("#search-header .opb-form-text").val();
          if ($("#" + inputId).val() == "" || $("#search-data").val() == "") {
            localStorage.setItem("changePage", true);
          }
          // window.location.href = originPathOne + "/search/";
          let getSearch = searchValue ? "?s=" + searchValue : "";
          window.location.href = originPathOne + "/search/" + getSearch;
        } else {
          if ($("#" + inputId).val() == "" || $("#search-data").val() == "") {
            $(".cat-more").addClass("hideBtn");
            if (pagesType !== "form" || pagesType !== "publications") {
              $(".c-tab-menu_list li").removeClass("item-active");
              $(".txt-num").empty();
              $("#all-data")
                .empty()
                .html(
                  "<h3 class='search-null'>How can we help you? Please enter a search term.</h3>"
                );
            }
          } else {
            $(".search-header-from #search-header .opb-form-text").val(
              searchValue
            );
            searchAll();
          }
        }
      } else if (inputId === "search-data2") {
        let currentURL = $(location).attr("href");

        if (currentURL.localeCompare(originPathOne + "/search/") !== 0) {
          searchValue = $("#search-header .opb-form-text").val();
          if ($("#" + inputId).val() == "" || $("#search-data").val() == "") {
            localStorage.setItem("changePage", true);
          }
          // window.location.href = originPathOne + "/search/";
          let getSearch = searchValue ? "?s=" + searchValue : "";
          window.location.href = originPathOne + "/search/" + getSearch;
        } else {
          if ($("#" + inputId).val() == "" || $("#search-data").val() == "") {
            $(".cat-more").addClass("hideBtn");
            if (pagesType !== "form" || pagesType !== "publications") {
              $(".c-tab-menu_list li").removeClass("item-active");
              $(".txt-num").empty();
              $("#all-data")
                .empty()
                .html(
                  "<h3 class='search-null'>How can we help you? Please enter a search term.</h3>"
                );
            }
          } else {
            searchAll();
          }
        }
        $("#search-header .opb-form-text").val(searchValue);
      }
      let $form = $("#search-page-form");
      var valid = $form.hasClass("is-input");
      var error_free = true;

      if (!valid) {
        if (inputId === "search-data" && $input.val() == "") {
          $(".opb-search-page .input-warning").addClass("is-active");
        }
        if (!isInitialSearch) {
          if (inputId === "search-data" && !$("#" + inputId).val() == "") {
            if (pagesType == "form") {
              typeActive = "forms";
            }
            if (pagesType == "publications") {
              typeActive = "publications";
            }
            if (typeActive == "all") {
              searchAll();
            } else {
              if (searchParams.has("type")) {
                let typeCate = searchParams.get("cate"),
                  typeName = searchParams.get("group"),
                  typeActive = searchParams.get("type"),
                  textSearch = searchParams.get("s");
                if ($("#search-data").val() == "" && textSearch) {
                  $("#search-data").val(textSearch);
                }
                searchByType(typeActive, typeCate, null, typeName);
              } else {
                searchByType(typeActive);
              }
            }
          } else if (
            (inputId === "search-data2" && !$("#" + inputId).val() == "") ||
            (inputId === "search-data3" && !$("#" + inputId).val() == "")
          ) {
            if (pagesType == "form") {
              typeActive = "forms";
            }
            if (pagesType == "publications") {
              typeActive = "publications";
            }
            if (typeActive == "all") {
              searchAll();
            } else {
              if (searchParams.has("type")) {
                let typeCate = searchParams.get("cate"),
                  typeName = searchParams.get("group"),
                  typeActive = searchParams.get("type"),
                  textSearch = searchParams.get("s");
                if ($("#search-data").val() == "" && textSearch) {
                  $("#search-data").val(textSearch);
                }
                searchByType(typeActive, typeCate, null, typeName);
              } else {
                searchByType(typeActive);
              }
            }
          } else if (pagesType !== "form" || pagesType !== "publications") {
            $(".cat-more").addClass("hideBtn");
            $(".c-tab-menu_list li").removeClass("item-active");
            $(".txt-num").empty();
            $("#all-data")
              .empty()
              .html(
                "<h3 class='search-null'>How can we help you? Please enter a search term.</h3>"
              );
          }
          isInitialSearch = true;
        }
        error_free = false;
      }
      if (!error_free) {
        event.preventDefault();
      } else {
        event.preventDefault();
        isInitialSearch = false;
        const searchValue = $("#search-page-form .opb-form-text").val();
        if (searchValue) {
          if (pagesType == "form") {
            event.preventDefault();
            typeActive = "forms";
          }
          if (pagesType == "publications") {
            event.preventDefault();
            typeActive = "publications";
          }

          if (typeActive == "all") {
            searchAll();
          } else {
            if (searchParams.has("type")) {
              let typeCate = searchParams.get("cate"),
                typeName = searchParams.get("group"),
                typeActive = searchParams.get("type"),
                textSearch = searchParams.get("s");
              if ($input.val() !== "") {
                searchParams.set("s", $input.val());
              } else if ($input.val() == "" && textSearch) {
                $input.val(textSearch);
              }
              searchByType(typeActive, typeCate, null, typeName);
            } else {
              searchByType(typeActive);
            }
          }
          search0215();
        }
      }
    }
  });
  $(".opb-page-header").insertBefore("#carouselHomepageIndicators");
  function initEvent() {
    $("#search-header .opb-btn-submit").click(function (event) {
      event.preventDefault();
      page = 1;
      let changePage = localStorage.getItem("changePage");
      if (changePage && changePage !== null) {
        localStorage.removeItem("changePage");
      }
      localStorage.removeItem("searchValue");
      let searchValue = $(this)
        .closest("#search-header")
        .find(".opb-form-text")
        .val();
      if (searchValue !== "") {
        localStorage.setItem("searchValue", searchValue);
        searchParams.set("s", searchValue);
      } else {
        localStorage.setItem("changePage", true);
        $(".c-tab-menu_list li:first-child").removeClass("item-active");
      }
      // if (valid) {
      let currentURL = $(location).attr("href");
      let getSearch = searchValue ? "?s=" + searchValue : "";
      if (currentURL.localeCompare(originPathOne + "/search/") !== 0) {
        window.location.href = originPathOne + "/search/" + getSearch;
      } else {
        newURL.search = searchParams.toString();
        let updatedURL = newURL.toString();
        window.history.pushState({ path: updatedURL }, "", updatedURL);
        searchAll();
        if (window.innerWidth < 769) {
          $(".search-header-icon, .search-header-from").toggleClass(
            "is-active"
          );
          $("html").toggleClass("is-hidden");
          $("html").toggleClass("disableScroll");
        }
        return false;
      }
    });
    // let searchGetValue = localStorage.getItem("searchValue");
    // if (searchGetValue) {
    //   $("#search-header .opb-form-text").val(searchGetValue);
    // }
    $(".c-tab-menu_list li:first-child").addClass("item-active");
    let $form = $("#search-page-form");
    let $input = $("#search-page-form .opb-form-text");
    $("#search-page-form .opb-btn-submit").click(function (event) {
      page = 1;
      window.scrollTo(0, 0);
      localStorage.removeItem("searchValue");
      if (!$input.val()) {
        localStorage.setItem("changePage", true);
      } else {
        localStorage.removeItem("changePage");
      }
      let changePage = localStorage.getItem("changePage");
      if (changePage !== null) {
        $(".c-tab-menu_list li:first-child").addClass("item-active");
      }

      localStorage.setItem("searchValue", $("#search-data").val());
      let valid = $form.hasClass("is-input");
      let error_free = true;
      if (!valid) {
        if ($input.val() == "") {
          $(".opb-search-page .input-warning").addClass("is-active");
        }
        if (!isInitialSearch && $input.val() !== "") {
          if (pagesType == "form") {
            typeActive = "forms";
          }
          if (pagesType == "publications") {
            typeActive = "publications";
          }
          if (typeActive == "all") {
            if ($input.val() == "") {
              if (pagesType !== "form" && pagesType !== "publications") {
                $(".cat-more").addClass("hideBtn");
              }
              $(".c-tab-menu_list li").removeClass("item-active");
              $(".txt-num").empty();
              $("#all-data")
                .empty()
                .html(
                  "<h3 class='search-null'>How can we help you? Please enter a search term.</h3>"
                );
            } else {
              searchAll();
            }
          } else {
            if (searchParams.has("type")) {
              let typeCate = searchParams.get("cate"),
                typeName = searchParams.get("group"),
                typeActive = searchParams.get("type"),
                textSearch = searchParams.get("s");
              if ($("#search-data").val() == "" && textSearch) {
                $("#search-data").val(textSearch);
              }
              searchByType(typeActive, typeCate, null, typeName);
            } else {
              searchByType(typeActive);
            }
          }

          isInitialSearch = true;
        } else if (
          (pagesType !== "form" && $(this).val() == "") ||
          (pagesType !== "publications" && $(this).val() == "")
        ) {
          if (pagesType !== "form" && pagesType !== "publications") {
            $(".cat-more").addClass("hideBtn");
          } else if (pagesType == "form" || pagesType == "publications") {
            if (!isInitialSearch) {
              searchByType(typeActive);
            } else {
              addLoadingClasses();
              setTimeout(() => {
                removeLoadingClasses();
              }, 500);
            }
            isInitialSearch = true;
          }
          $(".c-tab-menu_list li").removeClass("item-active");
          $(".txt-num").empty();
          $("#all-data")
            .empty()
            .html(
              "<h3 class='search-null'>How can we help you? Please enter a search term.</h3>"
            );
        }
        error_free = false;
      }
      if (!error_free) {
        event.preventDefault();
      } else {
        isInitialSearch = false;
        const searchValue = $input.val();
        if (searchValue && searchValue !== "") {
          if (pagesType == "form") {
            event.preventDefault();
            typeActive = "forms";
          }
          if (pagesType == "publications") {
            event.preventDefault();
            typeActive = "publications";
          }
          if (typeActive == "all") {
            searchAll();
          } else {
            if (searchParams.has("type")) {
              let typeCate = searchParams.get("cate"),
                typeName = searchParams.get("group"),
                typeActive = searchParams.get("type"),
                textSearch = searchParams.get("s");
              if ($input.val() !== "") {
                searchParams.set("s", $input.val());
              } else if ($input.val() == "" && textSearch) {
                $input.val(textSearch);
              }
              searchByType(typeActive, typeCate, null, typeName);
            } else {
              searchByType(typeActive);
            }
          }
          search0215();
        }
      }
    });

    $("select[name='selectPage']").on("change", function () {
      selectPageChange();
    });

    $("select[name='selectArticle']").on("change", function () {
      selectArticleChange();
    });

    $("select[name='formsSelectCategory']").on("change", function () {
      handleSelectChange();
    });

    $("select[name='formsSelectCode']").on("change", function () {
      handleSelectChange();
    });

    $("select[name='publicationsSelectCategory']").on("change", function () {
      handleSelectChangePublications();
    });

    $("select[name='publicationsSelectType']").on("change", function () {
      handleSelectChangePublications();
    });

    $(".cat-filter-item.item-page .content-body_btn a").on(
      "click",
      function () {
        $(".cat-filter-advanced_ttl span span span").empty();
        let radioButtons = $("input[name=filter-advanced-page]");
        let selectedRadio = null;
        radioButtons.each(function () {
          if ($(this).prop("checked")) {
            selectedRadio = $(this);
            return false; // break out of the each loop
          }
        });

        if (selectedRadio) {
          $(".cat-filter-advanced_ttl span span span").append(
            selectedRadio.next("label").text()
          );
          let val = selectedRadio.attr("dt-value");
          if (val) {
            if (val == "all") searchByType(typeActive);
            else searchByType(typeActive, val);
          }
        } else {
          console.log("No radio selected.");
        }
      }
    );
    // -----------------------------------------------------------------
    $(".cat-filter-item.item-articles .content-body_btn a").on(
      "click",
      function () {
        $(".cat-filter-advanced_ttl span span span").empty();
        let radioButtons = $("input[name=filter-advanced-article]");
        let selectedRadio = null;
        radioButtons.each(function () {
          if ($(this).prop("checked")) {
            selectedRadio = $(this);
            return false; // break out of the each loop
          }
        });
        let radioButtonsSort = $("input[name=soft-advanced-article]");
        let selectedRadioSort = null;
        radioButtonsSort.each(function () {
          if ($(this).prop("checked")) {
            selectedRadioSort = $(this);
            return false; // break out of the each loop
          }
        });
        if (selectedRadio) {
          $(".cat-filter-advanced_ttl span span span").append(
            selectedRadio.next("label").text()
          );
          let val = selectedRadio.attr("dt-value");
          if (val) {
            if (val == "all") searchByType(typeActive);
            else searchByType(typeActive, val);
          }
        } else {
          console.log("No radio selected.");
        }
      }
    );
    $(
      ".cat-filter-item.item-forms .content-body_btn a, .opb-page-header-form .cat-filter-advanced_content .content-body_btn a,.opb-page-header-form .code-filter-advanced_content .content-body_btn a"
    ).on("click", function () {
      $(".item-forms .cat-filter-advanced_ttl span span").empty();

      let radioButtons = $("input[name=filter-advanced-form]");
      let selectedRadio = null;
      radioButtons.each(function () {
        if ($(this).prop("checked")) {
          selectedRadio = $(this);
          return false; // break out of the each loop
        }
      });
      let radioButtonsCode = $("input[name=code-advanced-form]");
      let selectedRadioCode = null;
      radioButtonsCode.each(function () {
        if ($(this).prop("checked")) {
          selectedRadioCode = $(this);
          return false; // break out of the each loop
        }
      });
      if (selectedRadio || selectedRadioCode) {
        $(
          ".cat-filter-item.item-forms .cat-filter-advanced_ttl span span"
        ).append(selectedRadio.next("label").text());
        if ($(".code-filter-advanced_ttl span span").length > 0) {
          $(".code-filter-advanced_ttl span span").append(
            selectedRadioCode.next("label").text()
          );
        }

        let val = selectedRadio.attr("dt-value");
        let valcode = null;
        if (radioButtonsCode.length > 0) {
          valcode = selectedRadioCode.attr("dt-value");
        }
        if (pagesType == "form") {
          $(".cat-filter-advanced_ttl span span").empty();
          $(".code-filter-advanced_ttl span span").empty();
          $(".cat-filter-advanced_ttl span span ").append(
            selectedRadio.next("label").text()
          );
          if ($(".code-filter-advanced_ttl span span ").length > 0) {
            $(".code-filter-advanced_ttl span span ").append(
              selectedRadioCode.next("label").text()
            );
          }
          let sortCondition, activeCondition;
          if (pagesType == "form") {
            typeActive = "forms";
          }

          activeCondition = $(".page-sub-soft li.active");
          if (activeCondition.length > 0) {
            sortCondition =
              activeCondition.text() + "-" + activeCondition.attr("data-sort");
          } else {
            sortCondition = "Title-asc";
          }

          if (val && valcode) {
            if (val == "all" && valcode == "all") {
              searchByType(typeActive, null, sortCondition, null);
            } else if (val == "all" && valcode != "all") {
              searchByType(typeActive, null, sortCondition, valcode);
            } else if (val != "all" && valcode == "all") {
              searchByType(typeActive, val, sortCondition, null);
            } else {
              searchByType(typeActive, val, sortCondition, valcode);
            }
          }
        } else {
          if ($(".item-forms.is-active").length > 0) {
            $(".item-forms .code-filter-advanced_ttl span span").empty();
            $(".item-forms .cat-filter-advanced_ttl span span").empty();
            $(".item-forms .code-filter-advanced_ttl span span ").append(
              selectedRadioCode.next("label").text()
            );
            $(".item-forms .cat-filter-advanced_ttl span span ").append(
              selectedRadio.next("label").text()
            );
          }
          if (val && valcode) {
            if (val == "all" && valcode == "all") {
              searchByType(typeActive, null, "asc", null);
            } else if (val == "all" && valcode != "all") {
              searchByType(typeActive, null, "asc", valcode);
            } else if (val != "all" && valcode == "all") {
              searchByType(typeActive, val, "asc", null);
            } else {
              searchByType(typeActive, val, "asc", valcode);
            }
          }
        }
      } else {
        console.log("No radio selected.");
      }
    });
    $(
      ".cat-filter-item.item-publications .content-body_btn a,.cat-filter-item.item-publications .cat-filter-advanced_content .content-body_btn a,.cat-filter-item.item-publications .code-filter-advanced_content .content-body_btn a,.title-ublications .cat-filter-advanced_content .content-body_btn a,.title-ublications .code-filter-advanced_content .content-body_btn a"
    ).on("click", function () {
      $(".item-publications .cat-filter-advanced_ttl span span").empty();
      let radioButtons = $("input[name=filter-advanced-publications]");
      let selectedRadio = null;
      radioButtons.each(function () {
        if ($(this).prop("checked")) {
          selectedRadio = $(this);
          return false; // break out of the each loop
        }
      });
      let radioButtonsCode = $("input[name=code-advanced-publications]");
      let selectedRadioCode = null;
      radioButtonsCode.each(function () {
        if ($(this).prop("checked")) {
          selectedRadioCode = $(this);
          return false; // break out of the each loop
        }
      });
      if (selectedRadio || selectedRadioCode) {
        $(".item-publications .cat-filter-advanced_ttl span span").append(
          selectedRadio.next("label").text()
        );
        if (
          $(".item-publications .code-filter-advanced_ttl span span ").length >
          0
        ) {
          $(".item-publications .code-filter-advanced_ttl span span ").append(
            selectedRadioCode.next("label").text()
          );
        }

        let val = selectedRadio.attr("dt-value");
        let valcode = null;
        if (radioButtonsCode.length > 0) {
          valcode = selectedRadioCode.attr("dt-value");
        }
        if (pagesType == "publications") {
          $(".cat-filter-advanced_ttl span span").empty();
          $(".code-filter-advanced_ttl span span").empty();
          $(".cat-filter-advanced_ttl span span ").append(
            selectedRadio.next("label").text()
          );
          if ($(".code-filter-advanced_ttl span span ").length > 0) {
            $(".code-filter-advanced_ttl span span ").append(
              selectedRadioCode.next("label").text()
            );
          }
          let sortCondition, activeCondition;

          if (pagesType == "publications") {
            typeActive = "publications";
          }
          activeCondition = $(".page-sub-soft li.active");
          if (activeCondition.length > 0) {
            sortCondition =
              activeCondition.text() + "-" + activeCondition.attr("data-sort");
          } else {
            sortCondition = "Title-asc";
          }

          if (val && valcode) {
            if (val == "all" && valcode == "all") {
              searchByType(typeActive, null, sortCondition, null);
            } else if (val == "all" && valcode != "all") {
              searchByType(typeActive, null, sortCondition, valcode);
            } else if (val != "all" && valcode == "all") {
              searchByType(typeActive, val, sortCondition, null);
            } else {
              searchByType(typeActive, val, sortCondition, valcode);
            }
          }
        } else {
          if ($(".item-publications.is-active").length > 0) {
            $(".item-publications .code-filter-advanced_ttl span span").empty();
            $(".item-publications .cat-filter-advanced_ttl span span").empty();
            $(".item-publications .code-filter-advanced_ttl span span ").append(
              selectedRadioCode.next("label").text()
            );
            $(".item-publications .cat-filter-advanced_ttl span span ").append(
              selectedRadio.next("label").text()
            );
          }
          if (val && valcode) {
            if (val == "all" && valcode == "all") {
              searchByType(typeActive, null, "asc", null);
            } else if (val == "all" && valcode != "all") {
              searchByType(typeActive, null, "asc", valcode);
            } else if (val != "all" && valcode == "all") {
              searchByType(typeActive, val, "asc", null);
            } else {
              searchByType(typeActive, val, "asc", valcode);
            }
          }
        }
      } else {
        console.log("No radio selected.");
      }
    });
    /* Sort Select
     ********************************************** */
    $(".cat-filter-sort-list li:first-child").addClass("is-active");
    $(".cat-filter-sort-list.sort-articles li").click(function () {
      $(".cat-filter-sort-list.sort-articles li.is-active").removeClass(
        "is-active"
      );
      $(".cat-filter-sort-list.sort-articles li").addClass("is-active");
      $(this).removeClass("is-active");
      const activeCondition = document.querySelector(
        ".cat-filter-sort-list.sort-articles li.is-active"
      );
      const sortCondition = activeCondition.id;
      var val = $("select[name='selectArticle']").val();
      if (val) {
        if (val == "01") searchByType(typeActive, null, sortCondition);
        else searchByType(typeActive, typeCategoryArticles[val], sortCondition);
        return;
      }
      searchByType(typeActive, "", sortCondition);
      // return false;
    });

    $(".cat-filter-sort-list.sort-forms li").click(function () {
      $(".cat-filter-sort-list.sort-forms li.is-active").removeClass(
        "is-active"
      );
      $(".cat-filter-sort-list.sort-forms li").addClass("is-active");
      $(this).removeClass("is-active");
      const activeCondition = document.querySelector(
        ".cat-filter-sort-list.sort-forms li.is-active"
      );

      const sortCondition = activeCondition.id;
      var val = $("select[name='formsSelectCategory']").val();
      if (val) {
        if (val == "01") searchByType(typeActive, null, sortCondition);
        else searchByType(typeActive, typeCategoryArticles[val], sortCondition);
        return;
      }
      searchByType(typeActive, "", sortCondition);
      // return false;
    });

    $(".cat-filter-sort-list.sort-publications li").click(function () {
      $(".cat-filter-sort-list.sort-publications li.is-active").removeClass(
        "is-active"
      );
      $(".cat-filter-sort-list.sort-publications li").addClass("is-active");
      $(this).removeClass("is-active");
      const activeCondition = document.querySelector(
        ".cat-filter-sort-list.sort-publications li.is-active"
      );
      const sortCondition = activeCondition.id;
      var val = $("select[name='publicationsSelectCategory']").val();
      if (val) {
        if (val == "01") searchByType(typeActive, null, sortCondition);
        else searchByType(typeActive, val, sortCondition);
        return;
      }
      searchByType(typeActive, "", sortCondition);
      // return false;
    });
    $(".page-sub-soft ul").on("click", "li", function () {
      let $this = $(this);
      let sortClass = $this.attr("data-sort") ? $this.attr("data-sort") : "asc";
      if (sortClass === "asc") {
        sortClass = "desc";
      } else {
        sortClass = "asc";
      }
      $("li").removeClass("active");
      $this.addClass("active").attr("data-sort", sortClass);

      if (pagesType == "publications") {
        handleSelectChangePublications();
      } else if (pagesType == "form") {
        handleSelectChange();
      }
    });

    $(window).scroll(function () {
      var fixedDiv = $(
        ".opb-page-header-form-fixed,.opb-page-header-main-fixed"
      );
      if (fixedDiv.length > 0) {
        var fixedDivPosition = fixedDiv.offset().top - 104;
        if (fixedDivPosition < $(window).scrollTop()) {
          fixedDiv.addClass("active");
        } else {
          fixedDiv.removeClass("active");
        }
      }
    });
    $(".cat-filter").removeClass("is-active");
    headerSearch0215();
    if (pagesType !== "form" && pagesType !== "publications") {
      btnLoad();
    }
  }
  function handleSelectChangePublications() {
    if (pagesType == "publications") {
      typeActive = "publications";
    }
    if (window.innerWidth < 991) {
      var val = $(
        '.list input[name="filter-advanced-publications"]:checked'
      ).attr("dt-value");
      var valCode = $(
        '.list input[name="code-advanced-publications"]:checked'
      ).attr("dt-value");
    } else {
      var val = $("select[name='publicationsSelectCategory']").val();
      var valCode = $("select[name='publicationsSelectType']").val();
    }

    let sortCondition, activeCondition;

    if (pagesType == "publications") {
      activeCondition = $(".page-sub-soft li.active");
      if (activeCondition.length > 0) {
        sortCondition =
          activeCondition.text() + "-" + activeCondition.attr("data-sort");
      } else {
        sortCondition = "Title-asc";
      }
    } else {
      activeCondition = $(
        ".cat-filter-sort-list.sort-publications li.is-active"
      );
      sortCondition = activeCondition ? activeCondition.id : "asc";
    }

    if (val === "all" && valCode === "all") {
      searchByType(typeActive, null, sortCondition, null);
    } else {
      var typeCategory = null;
      var codeCategory = null;

      if (val !== "all") {
        typeCategory = val;
      }

      if (valCode !== "all") {
        codeCategory = valCode;
      }
      searchByType(typeActive, typeCategory, sortCondition, codeCategory);
    }
  }
  function handleSelectChange() {
    if (pagesType == "form") {
      typeActive = "forms";
    }
    let val, valCode;
    if (window.innerWidth < 991) {
      val = $('.list input[name="filter-advanced-form"]:checked').attr(
        "dt-value"
      );
      valCode = $('.list input[name="code-advanced-form"]:checked').attr(
        "dt-value"
      );
    } else {
      val = $("select[name='formsSelectCategory']").val();
      valCode = $("select[name='formsSelectCode']").val();
    }
    let sortCondition, activeCondition;

    if (pagesType == "form") {
      activeCondition = $(".page-sub-soft li.active");
      if (activeCondition.length > 0) {
        sortCondition =
          activeCondition.text() + "-" + activeCondition.attr("data-sort");
      } else {
        sortCondition = "Title-asc";
      }
    } else {
      activeCondition = $(".cat-filter-sort-list.sort-forms li.is-active");
      sortCondition = activeCondition ? activeCondition.id : "asc";
    }
    if (val === "all" && valCode === "all") {
      searchByType(typeActive, null, sortCondition, null);
    } else {
      let typeCategory = null;
      let codeCategory = null;

      if (val !== "all") {
        typeCategory = val;
      }

      if (valCode !== "all") {
        codeCategory = valCode;
      }
      searchByType(typeActive, typeCategory, sortCondition, codeCategory);
    }
  }
  function selectPageChange() {
    let val = $("select[name='selectPage']").val();
    if (val) {
      if (val == "all") searchByType(typeActive);
      else searchByType(typeActive, val);
    }
  }
  function selectArticleChange() {
    let val = $("select[name='selectArticle']").val();
    if (val) {
      if (val == "all") searchByType(typeActive);
      else searchByType(typeActive, val);
    }
  }
  function customizeSelect() {
    $(".js-select-nws").each(function () {
      var $this = $(this);
      $this.find(".select-selected").remove();
      $this.find(".select-items").remove();
      var $select = $this.find("select");
      var $options = $select.find("option");

      var $selectSelected = $("<div>", {
        class: "select-selected",
        html: $options.eq($select.prop("selectedIndex")).html(),
      });
      $this.append($selectSelected);

      var $selectItems = $("<div>", {
        class: "select-items select-hide",
      });
      $options.each(function (i) {
        var $option = $(this);
        var $item = $("<p>", {
          class: "item",
          html: $option.html(),
          value: $option.val(),
        });
        $item.click(function () {
          $select.prop("selectedIndex", i);
          $selectSelected.html($option.html());
          if ($(".item-forms.is-active").length > 0 || pagesType == "form") {
            handleSelectChange();
          } else if (
            $(".item-publications.is-active").length > 0 ||
            pagesType == "publications"
          ) {
            handleSelectChangePublications();
          } else if ($(".item-page.is-active").length > 0) {
            selectPageChange();
          } else if ($(".item-articles.is-active").length > 0) {
            selectArticleChange();
          }
          $item
            .addClass("same-as-selected")
            .siblings()
            .removeClass("same-as-selected");
          $selectSelected.click();
        });
        $selectItems.append($item);
      });
      $this.append($selectItems);

      $selectSelected.click(function (e) {
        e.stopPropagation();
        $(".select-items").addClass("select-hide");
        $selectItems.toggleClass("select-hide");
        $(this).toggleClass("select-arrow-active");
      });
    });

    $(document).click(function () {
      $(".select-items").addClass("select-hide");
      $(".select-selected").removeClass("select-arrow-active");
    });
  }
  function getTotal() {
    $.ajax({
      url: searchjson,
      type: "GET",
      dataType: "json",
      data: {
        action: "getTotal",
      },
      success: function (response) {
        const result = {};
        response.data.forEach((element) => {
          if (!result[element.type]) {
            result[element.type] = 0;
          }
          result[element.type]++;
        });
        result.all = response.data.length;

        let changePage = localStorage.getItem("changePage");
        let count = 0;

        for (const [key, value] of Object.entries(type)) {
          count++;

          if (searchParams.has("type") && searchParams.get("type") == key) {
            $(".c-tab-menu_item:nth-child(" + count + ")").addClass(
              "item-active"
            );
          } else if (changePage !== null) {
            $(".c-tab-menu_item").removeClass("item-active");
          } else {
            $(".c-tab-menu_item:nth-child(" + count + ")").removeClass(
              "item-active"
            );
          }
        }
        var $input = $("#search-page-form .opb-form-text");
        let searchData = $input.val();
        if (searchData !== "" && searchData) {
          searchParams.set("s", searchData);
        } else {
          if (searchParams.has("s")) {
            $("#search-data").val(searchParams.get("s"));
          }
        }

        if (searchParams.has("type")) {
          let typeCate = searchParams.has("cate")
              ? searchParams.get("cate")
              : null,
            typeName = searchParams.has("group")
              ? searchParams.get("group")
              : null,
            typeActive = searchParams.get("type");
          searchByType(typeActive, typeCate, null, typeName);
        } else {
          searchAll();
        }
        if (typeActive !== "all") {
          $(".opb-page-content").addClass("cs-padding");
        } else {
          $(".opb-page-content").removeClass("cs-padding");
        }
        handleClickFromTab();
      },
    });
  }
  function changeTabBookMark() {
    typeActive = searchParams.get("type");
    $(".cat-filter").addClass("is-active");
    if ($(".cat-filter-item.item-" + typeActive).length > 0) {
      $(".cat-filter-item.item-" + typeActive).addClass("is-active");
    }
  }
  function fistLoad() {
    // $(".opb-search-page .input-warning").addClass("is-active");
    $(".cat-more").addClass("hideBtn");
    $(".txt-num").empty();
    if (pagesType !== "form" && pagesType !== "publications") {
      // $(".c-tab-menu_list li").removeClass("item-active");
      $("#all-data")
        .empty()
        .html(
          "<h3 class='search-null'>How can we help you? Please enter a search term.</h3>"
        );
    }
  }

  function handleClickFromTab() {
    let changePage = localStorage.getItem("changePage");
    $(".c-tab-menu_list li a").click(function () {
      isCustomized = false;
      $(".select-selected, .select-items").remove();
      $(".cat-filter select").empty();
      $(".cat-filter-item ul.list").empty();
      // localStorage.removeItem("changePage");
      var item = $(this).attr("href");
      $(".c-tab-menu_list li").removeClass("item-active");
      if (changePage == null) {
        $(".input-warning").removeClass("is-active");
      }
      $(this).parent().addClass("item-active");

      const index = $(this).parent().index();

      if ($(".cat-filter-item").length > 0) {
        if (index !== 0) {
          $(".opb-page-content").addClass("cs-padding");
        } else {
          $(".opb-page-content").removeClass("cs-padding");
        }
        $(".cat-filter").addClass("is-active");
        page = 1;
        switch (index) {
          case 0:
            typeActive = "all";
            searchAll();
            $(".cat-filter-item").removeClass("is-active");
            $(".cat-filter").removeClass("is-active");
            break;
          case 1:
            typeActive = "page";
            searchByType("page");
            $(".cat-more-btn").attr("id", "cat-more-" + typeActive);
            $("#selectPage").prop("selectedIndex", 0);
            $(".cat-filter-item").removeClass("is-active");
            $(".cat-filter-item.item-page").addClass("is-active");
            $(
              ".cat-filter-item.item-page .cat-filter-advanced_ttl span span span"
            ).empty();
            $(
              ".cat-filter-item.item-page .cat-filter-advanced_ttl span span span"
            ).append("All web pages");
            $('input[name="filter-advanced-page"]:first').prop("checked", true);

            $(".cat-filter-select .select-selected").text("All web pages");
            $('input[name="selectPage"]:first').prop("checked", true);
            break;
          case 4:
            typeActive = "articles";
            searchByType("articles");
            $(".cat-more-btn").attr("id", "cat-more-" + typeActive);
            $(".cat-filter-item").removeClass("is-active");
            $(".cat-filter-item.item-articles").addClass("is-active");
            $(
              ".cat-filter-item.item-articles .cat-filter-advanced_ttl span span span"
            ).empty();
            $(
              ".cat-filter-item.item-articles .cat-filter-advanced_ttl span span span"
            ).append("All articles");
            $('input[name="filter-advanced-article"]:first').prop(
              "checked",
              true
            );
            $(".cat-filter-select .select-selected").text("All articles");
            $('input[name="selectArticle"]:first').prop("checked", true);
            break;
          case 2:
            typeActive = "forms";
            searchByType("forms");
            $(".cat-more-btn").attr("id", "cat-more-" + typeActive);
            $(".cat-filter-item").removeClass("is-active");
            $(".cat-filter-item.item-forms").addClass("is-active");
            $(
              ".cat-filter-item.item-forms .cat-filter-advanced_ttl span span"
            ).empty();
            $(
              ".cat-filter-item.item-forms .cat-filter-advanced_ttl span span"
            ).append("All categories");
            $('input[name="filter-advanced-forms"]:first').prop(
              "checked",
              true
            );
            $(".cat-filter-select .select-selected").text("All categories");
            $(".code-filter-selectV1 .select-selected").text("All code groups");
            $(
              ".cat-filter-item.item-forms .code-filter-advanced_ttl span span"
            ).empty();
            $(
              ".cat-filter-item.item-forms .code-filter-advanced_ttl span span"
            ).append("All code groups");
            $('input[name="code-advanced-forms"]:first').prop("checked", true);
            if (pagesType == "form") {
              $(
                ".cat-filter-item.item-forms .cat-filter-advanced_ttl span span, .code-filter-item.item-forms .cat-filter-advanced_ttl span span"
              ).empty();
            }
            break;
          case 3:
            typeActive = "publications";
            searchByType("publications");
            $(".cat-more-btn").attr("id", "cat-more-" + typeActive);
            $(".cat-filter-item").removeClass("is-active");
            $(".cat-filter-item.item-publications").addClass("is-active");
            $(
              ".cat-filter-item.item-publications .cat-filter-advanced_ttl span span,.cat-filter-item.item-publications .code-filter-advanced_ttl span span "
            ).empty();
            $(
              ".cat-filter-item.item-publications .cat-filter-advanced_ttl span span "
            ).append("All publications");

            $(
              ".cat-filter-item.item-publications .code-filter-advanced_ttl span span"
            ).append("All types");
            $('input[name="code-advanced-publications"]:first').prop(
              "checked",
              true
            );
            $('input[name="filter-advanced-publications"]:first').prop(
              "checked",
              true
            );
            $(".cat-filter-select .select-selected").text("All publications");
            $(".code-filter-select .select-selected").text("All type");
            if (pagesType == "publications") {
              $(
                ".cat-filter-item.item-publications .cat-filter-advanced_ttl span span, .code-filter-item.item-publications .cat-filter-advanced_ttl span span"
              ).empty();
              $(
                ".cat-filter-item.item-publications .cat-filter-advanced_ttl span span"
              ).append("All publications");
            }
            break;
        }
      }

      $(".opb-search-page-body .opb-search-page-cat").removeClass("is-active");
      $(item).addClass("is-active");
      return false;
    });
  }

  function searchByType(
    type = "",
    category = "",
    sortCondition = null,
    name = ""
  ) {
    const data = {
      action: "getByType",
      type: type,
      category: category,
      page: page,
      limit: limit,
      name: name,
    };
    let $input = $("#search-page-form .opb-form-text");
    let searchData = $input.val();
    let activeCondition;

    if (localValue != "" && localValue == searchData) {
      searchData = localValue;
    }
    if (searchData) {
      data["searchData"] = searchData;
    }

    if (type !== "") {
      searchParams.set("type", type);
    } else {
      searchParams.delete("type");
    }
    if (searchData !== "" && searchData) {
      searchParams.set("s", searchData);
    } else {
      searchParams.delete("s");
    }
    if (category !== "" && category !== null) {
      searchParams.set("cate", category);
    } else {
      searchParams.delete("cate");
    }

    if (name !== "" && name !== null) {
      searchParams.set("group", name);
    } else {
      searchParams.delete("group");
    }
    newURL.search = searchParams.toString();
    let updatedURL = newURL.toString();

    window.history.pushState({ path: updatedURL }, "", updatedURL);
    if (searchParams.has("type")) {
      typeActive = searchParams.get("type");
      changeTabBookMark();
    }

    if (sortCondition) {
      data["sort"] = sortCondition;
    }
    if (type == "forms") {
      if (pagesType == "form") {
        activeCondition = $(".page-sub-soft li.active");
        if (activeCondition.length > 0) {
          sortCondition =
            activeCondition.text() + "-" + activeCondition.attr("data-sort");
        } else {
          sortCondition = "Title-asc";
        }
        if (sortCondition) {
          data["sort"] = sortCondition;
        }
      } else {
        activeCondition = document.querySelector(
          ".cat-filter-sort-list.sort-forms li.is-active"
        );
        if (activeCondition) {
          sortCondition = activeCondition.id;
        } else {
          sortCondition = "asc";
        }
        if (sortCondition) {
          data["sort"] = null;
        }
      }
      let val = $("select[name='formsSelectCategory']").val();
      if (val) {
        if (val !== "all") data["category"] = val;
      }
      let valCode = $("select[name='formsSelectCode']").val();
      if (valCode) {
        if (valCode !== "all") data["name"] = valCode;
      }
    }

    if (type == "publications") {
      if (pagesType == "publications") {
        activeCondition = $(".page-sub-soft li.active");
        if (activeCondition.length > 0) {
          sortCondition =
            activeCondition.text() + "-" + activeCondition.attr("data-sort");
        } else {
          sortCondition = "Title-asc";
        }
        if (sortCondition) {
          data["sort"] = sortCondition;
        }
      } else {
        activeCondition = document.querySelector(
          ".cat-filter-sort-list.sort-publications li.is-active"
        );
        if (activeCondition) {
          sortCondition = activeCondition.id;
        } else {
          sortCondition = "asc";
        }
        if (sortCondition) {
          data["sort"] = null;
        }
      }
      let val = $("select[name='publicationsSelectCategory']").val();
      if (val) {
        if (val !== "all") data["category"] = val;
      }
      let valCode = $("select[name='publicationsSelectType']").val();
      if (valCode) {
        if (valCode !== "all") data["name"] = valCode;
      }
    }

    $.ajax({
      url: searchjson,
      type: "GET",
      dataType: "json",
      data: data,
      beforeSend: function () {
        addLoadingClasses();
      },
      success: function (response) {
        let dataFilter = response.data,
          dataFilterCate = response.data;
        dataFilter = dataFilter.filter(function (item) {
          return item.type.toLowerCase().indexOf(type.toLowerCase()) !== -1;
        });
        dataFilterCate = dataFilter.filter(function (item) {
          return item.type.toLowerCase().indexOf(type.toLowerCase()) !== -1;
        });
        if (data["sort"] === "desc") {
          dataFilter.sort(function (a, b) {
            return b.title.localeCompare(a.title);
          });
        } else if (data["sort"] === "asc") {
          dataFilter.sort(function (a, b) {
            return a.title.localeCompare(b.title);
          });
        }
        if (
          type === "forms" ||
          (type === "publications" &&
            data["sort"] &&
            data["sort"].trim().length > 0)
        ) {
          if (
            data["sort"] !== "desc" &&
            data["sort"] !== "asc" &&
            data["sort"] !== null
          ) {
            const [sortType, sortVal] = data["sort"].split("-");
            const sortFunctions = {
              Title: {
                desc: (a, b) => b.title.localeCompare(a.title),
                asc: (a, b) => a.title.localeCompare(b.title),
              },
              Category: {
                desc: (a, b) => b.category.slug.localeCompare(a.category.slug),
                asc: (a, b) => a.category.slug.localeCompare(b.category.slug),
              },
              Code: {
                desc: (a, b) => b.code.localeCompare(a.code),
                asc: (a, b) => a.code.localeCompare(b.code),
              },
              Type: {
                desc: (a, b) => b.name.slug.localeCompare(a.name.slug),

                asc: (a, b) => a.name.slug.localeCompare(b.name.slug),
              },
            };

            if (
              sortFunctions.hasOwnProperty(sortType) &&
              sortFunctions[sortType].hasOwnProperty(sortVal)
            ) {
              dataFilter.sort(sortFunctions[sortType][sortVal]);
            }
          }
        }

        if (category && category !== "") {
          dataFilter = dataFilter.filter(function (item) {
            return (
              item.category.slug
                .toLowerCase()
                .indexOf(category.toLowerCase()) !== -1
            );
          });
        }
        if (pagesType === "form" || pagesType === "publications") {
          if (data["searchData"] && data["searchData"] !== "") {
            dataFilter = dataFilter.filter(function (item) {
              return (
                item.title
                  .toLowerCase()
                  .indexOf(data["searchData"].toLowerCase()) !== -1
              );
            });
          }
        }

        if (name && name !== "") {
          dataFilter = dataFilter.filter(function (item) {
            return (
              item.name.slug.toLowerCase().indexOf(name.toLowerCase()) !== -1
            );
          });
        }

        let totalResults = dataFilter.length;

        let startIndex = (page - 1) * limit;
        let endIndex = startIndex + limit;
        let responseData = dataFilter.slice(startIndex, endIndex);
        let displayedResults = responseData.length;

        const values = responseData || [];

        let dynamicHtml = "";

        let groupedData = {};
        let uniqueCategories = [];
        let groupedDataCode = {};
        let uniqueCode = [];
        let selectedValues = null;
        let selectedCode = null;
        values?.forEach((item) => {
          const htmlRedner = renderSubItemForGetAll(item);
          dynamicHtml += htmlRedner;
        });
        let listCate = dataFilterCate || [];
        listCate?.forEach((item) => {
          let categorySlug = item.category.slug;

          if (!groupedData[categorySlug]) {
            groupedData[categorySlug] = [];
          }
          groupedData[categorySlug].push(item);

          if (!uniqueCategories.includes(categorySlug)) {
            uniqueCategories.push(categorySlug);
          }

          let codeSlug = item.name ? item.name.slug : [];
          if (!groupedDataCode[codeSlug]) {
            groupedDataCode[codeSlug] = [];
          }
          groupedDataCode[codeSlug].push(item);

          if (!uniqueCode.includes(codeSlug)) {
            uniqueCode.push(codeSlug);
          }
        });
        if (selectedValues === null) {
          selectedValues = uniqueCategories;
        }
        if (selectedCode === null) {
          selectedCode = uniqueCode;
        }
        if (searchData != "") {
          getSearchText = " for “" + searchData + "”";
        }
        let changePage = localStorage.getItem("changePage");
        setTimeout(() => {
          // $(".cat-more-btn").attr("id", "cat-more-" + typeActive);
          if (displayedResults < limit) {
            $(".cat-more").addClass("hideBtn");
          } else {
            $(".cat-more").removeClass("hideBtn");
          }
          let render = "";

          switch (type) {
            case "page":
              if (!isCustomized) {
                let getCate = searchParams.get("cate");
                let $select = $("#selectPage");
                $select.empty();
                let $radioSP = $(".cat-filter-item.item-page ul.list");
                $radioSP.empty();
                let selectOptionHTML = `<option ${
                  getCate == null ? "selected" : ""
                } value="all">All web pages</option>`;
                let radioInputHTML = `<li><input type="radio" name="filter-advanced-page" id="filter-advanced-1" dt-value="all" ${
                  getCate == null ? "checked" : ""
                }>`;
                radioInputHTML += `<label for="filter-advanced-1">All web pages</label></li>`;

                $select.append(selectOptionHTML);
                $radioSP.append(radioInputHTML);

                uniqueCategories = [
                  ...new Set(selectedValues.concat(uniqueCategories)),
                ];
                let htmlOptions = uniqueCategories.map(
                  (categorySlug, index) => {
                    let categoryItems = groupedData[categorySlug];
                    let categoryName = categoryItems[0].category.name;
                    let selected =
                        getCate && getCate === categorySlug ? "selected" : "",
                      checked =
                        getCate && getCate === categorySlug ? "checked" : "";

                    let optionHTML = `<option value="${categorySlug}" ${selected}>${categoryName}</option>`;
                    let radioHTML = `<li><input type="radio" name="filter-advanced-page" id="filter-advanced-${
                      index + 2
                    }" dt-value="${categorySlug}" ${checked}><label for="filter-advanced-${
                      index + 2
                    }">${categoryName}</label></li>`;
                    getCate && getCate === categorySlug
                      ? $(
                          ".cat-filter-item.item-page .cat-filter-advanced_ttl span span span"
                        )
                          .empty()
                          .text(categoryName)
                      : "";

                    return {
                      option: optionHTML,
                      radio: radioHTML,
                    };
                  }
                );
                $select.append(
                  htmlOptions.map((option) => option.option).join("")
                );

                $radioSP.append(
                  htmlOptions.map((option) => option.radio).join("")
                );
              }
              render = `<div id="cat-02" class="opb-search-page-cat">
                          <div class="cat-inner">
                            <h3 class="body-ttl">Pages search results ${
                              searchData != "" ? getSearchText : ""
                            }</h3>
                            <div class="cat-list">${dynamicHtml}</div>
                          </div>
                        </div>`;
              break;
            case "articles":
              if (!isCustomized) {
                let getCate = searchParams.get("cate");
                let $select = $("#selectArticle");
                $select.empty();
                let $radioSP = $(".cat-filter-item.item-articles ul.list");
                $radioSP.empty();
                let selectOptionHTML = `<option ${
                  getCate == null ? "selected" : ""
                } value="all">All articles</option>`;
                let radioInputHTML = `<li><input type="radio" name="filter-advanced-article" id="filter-advanced-article-1" dt-value="all" ${
                  getCate == null ? "checked" : ""
                }>`;
                radioInputHTML += `<label for="filter-advanced-article-1">All articles</label></li>`;

                $select.append(selectOptionHTML);
                $radioSP.append(radioInputHTML);
                uniqueCategories = [
                  ...new Set(selectedValues.concat(uniqueCategories)),
                ];
                let htmlOptions = uniqueCategories.map(
                  (categorySlug, index) => {
                    let categoryItems = groupedData[categorySlug];
                    let categoryName = categoryItems[0].category.name;
                    let selected =
                        getCate && getCate === categorySlug ? "selected" : "",
                      checked =
                        getCate && getCate === categorySlug ? "checked" : "";

                    let optionHTML = `<option value="${categorySlug}" ${selected}>${categoryName}</option>`;
                    let radioHTML = `<li><input type="radio" name="filter-advanced-article" id="filter-advanced-article-${
                      index + 2
                    }" dt-value="${categorySlug}" ${checked}><label for="filter-advanced-article-${
                      index + 2
                    }">${categoryName}</label></li>`;
                    getCate && getCate === categorySlug
                      ? $(
                          ".cat-filter-item.item-articles .cat-filter-advanced_ttl span span span"
                        )
                          .empty()
                          .text(categoryName)
                      : "";
                    return {
                      option: optionHTML,
                      radio: radioHTML,
                    };
                  }
                );

                $select.append(
                  htmlOptions.map((option) => option.option).join("")
                );
                $radioSP.append(
                  htmlOptions.map((option) => option.radio).join("")
                );
              }
              render = `<div id="cat-05" class="opb-search-page-cat">
                      <div class="cat-inner">
                        <h3 class="body-ttl">Articles search results ${
                          searchData != "" ? getSearchText : ""
                        }</h3>
                        <div class="cat-list">${dynamicHtml}</div>
                      </div>
                    </div>`;
              break;
            case "forms":
              if (!isCustomized) {
                let getCate = searchParams.get("cate");
                let getCode = searchParams.get("group");

                let $select = $("#formsSelectCategory");
                let $selectCode = $("#formsSelectCode");
                $select.empty();
                $selectCode.empty();
                let $radioSP, $radioCodeSP;

                if (pagesType === "form") {
                  $radioSP = $(".filter-advanced-content .content-cat ul.list");

                  $radioCodeSP = $(
                    ".filter-advanced-content .content-code ul.list"
                  );
                } else {
                  $radioSP = $(
                    ".cat-filter-item.item-forms .content-cat ul.list"
                  );
                  $radioCodeSP = $(
                    ".cat-filter-item.item-forms .content-code ul.list"
                  );
                }
                $radioSP.empty();
                $radioCodeSP.empty();

                let selectOptionHTML = [];
                let radioInputHTML = [];

                if (getCate == null) {
                  selectOptionHTML.push(
                    '<option selected value="all">All categories</option>'
                  );
                  radioInputHTML.push(
                    '<li><input type="radio" name="filter-advanced-form" id="filter-advanced-form-1" dt-value="all" checked>',
                    '<label for="filter-advanced-form-1">All categories</label></li>'
                  );
                } else {
                  selectOptionHTML.push(
                    '<option value="all">All categories</option>'
                  );
                  radioInputHTML.push(
                    '<li><input type="radio" name="filter-advanced-form" id="filter-advanced-form-1" dt-value="all">',
                    '<label for="filter-advanced-form-1">All categories</label></li>'
                  );
                }

                $select.append(selectOptionHTML.join(""));
                $radioSP.append(radioInputHTML.join(""));

                selectOptionHTML = [];
                radioInputHTML = [];

                if (getCode == null) {
                  selectOptionHTML.push(
                    '<option selected value="all">All code groups</option>'
                  );
                  radioInputHTML.push(
                    '<li><input type="radio" name="code-advanced-form" id="code-advanced-form-1" dt-value="all" checked>',
                    '<label for="code-advanced-form-1">All code groups</label></li>'
                  );
                } else {
                  selectOptionHTML.push(
                    '<option value="all">All code groups</option>'
                  );
                  radioInputHTML.push(
                    '<li><input type="radio" name="code-advanced-form" id="code-advanced-form-1" dt-value="all">',
                    '<label for="code-advanced-form-1">All code groups</label></li>'
                  );
                }

                $selectCode.append(selectOptionHTML.join(""));
                $radioCodeSP.append(radioInputHTML.join(""));
                uniqueCategories = [
                  ...new Set(selectedValues.concat(uniqueCategories)),
                ];
                let selectOptionHTMLArray = uniqueCategories.map(
                  (categorySlug, index) => {
                    let categoryItems = groupedData[categorySlug];
                    let categoryName = categoryItems[0].category.name;
                    let selected =
                      getCate && getCate === categorySlug ? "selected" : "";

                    return `<option ${selected} value="${categorySlug}">${categoryName}</option>`;
                  }
                );

                let radioInputHTMLArray = uniqueCategories.map(
                  (categorySlug, index) => {
                    let categoryItems = groupedData[categorySlug];
                    let categoryName = categoryItems[0].category.name;
                    let selected =
                      getCate && getCate === categorySlug ? "checked" : "";
                    getCate && getCate === categorySlug
                      ? $(
                          ".cat-filter-item.item-forms .cat-filter-advanced_ttl span span,.cat-filter-advanced .list .cat-filter-advanced_ttl span span"
                        )
                          .empty()
                          .text(categoryName)
                      : "";
                    return `<li><input type="radio" name="filter-advanced-form" id="filter-advanced-form-${
                      index + 2
                    }" dt-value="${categorySlug}" ${selected}><label for="filter-advanced-form-${
                      index + 2
                    }">${categoryName}</label></li>`;
                  }
                );

                $select.append(selectOptionHTMLArray.join(""));
                $radioSP.append(radioInputHTMLArray.join(""));
                uniqueCode = [...new Set(selectedCode.concat(uniqueCode))];
                let selectCodeOptionHTMLArray = uniqueCode.map(
                  (codeSlug, index) => {
                    let codeItems = groupedDataCode[codeSlug];
                    let codeName = codeItems[0].name.name;
                    let selected =
                      getCode && getCode === codeSlug ? "selected" : "";

                    return `<option ${selected} value="${codeSlug}">${codeName}</option>`;
                  }
                );

                let radioCodeInputHTMLArray = uniqueCode.map(
                  (codeSlug, index) => {
                    let codeItems = groupedDataCode[codeSlug];
                    let codeName = codeItems[0].name.name;
                    let selected =
                      getCode && getCode === codeSlug ? "checked" : "";
                    getCode && getCode === codeSlug
                      ? $(
                          ".cat-filter-item.item-forms .code-filter-advanced_ttl span span,.cat-filter-advanced .code-filter-advanced_ttl span span"
                        )
                          .empty()
                          .text(codeName)
                      : "";
                    return `<li><input type="radio" name="code-advanced-form" id="code-advanced-form-${
                      index + 2
                    }" dt-value="${codeSlug}" ${selected}><label for="code-advanced-form-${
                      index + 2
                    }">${codeName}</label></li>`;
                  }
                );

                $selectCode.append(selectCodeOptionHTMLArray.join(""));
                $radioCodeSP.append(radioCodeInputHTMLArray.join(""));
              }
              if (pagesType == "form") {
                render = `<div id="cat-03" class="opb-search-page-cat">
                        <div class="cat-inner">
                          <div class="cat-list">${dynamicHtml}</div>
                        </div>
                      </div>`;
              } else {
                render = `<div id="cat-03" class="opb-search-page-cat opb-search-page-form ">
                        <div class="cat-inner">
                          <h3 class="body-ttl">Forms search results ${
                            searchData != "" ? getSearchText : ""
                          }</h3>
                          <div class="cat-list">${dynamicHtml}</div>
                        </div>
                      </div>`;
              }
              break;
            case "publications":
              if (!isCustomized) {
                let getCate = searchParams.get("cate");
                let getCode = searchParams.get("group");

                let $select = $("#publicationsSelectCategory");
                let $selectCode = $("#publicationsSelectType");
                $select.empty();
                $selectCode.empty();
                let $radioSP, $radioCodeSP;

                if (pagesType === "publications") {
                  $radioSP = $(".filter-advanced-content .content-cat ul.list");
                  $radioCodeSP = $(
                    ".filter-advanced-content .content-code ul.list"
                  );
                } else {
                  $radioSP = $(
                    ".cat-filter-item.item-publications .content-cat ul.list"
                  );
                  $radioCodeSP = $(
                    ".cat-filter-item.item-publications .content-code ul.list"
                  );
                }
                $radioSP.empty();
                $radioCodeSP.empty();
                let selectOptionHTML = [];
                let radioInputHTML = [];

                if (getCate == null) {
                  selectOptionHTML.push(
                    '<option selected value="all">All categories</option>'
                  );
                  radioInputHTML.push(
                    '<li><input type="radio" name="filter-advanced-publications" id="filter-advanced-publications-1" dt-value="all" checked>',
                    '<label for="filter-advanced-publications-1">All categories</label></li>'
                  );
                } else {
                  selectOptionHTML.push(
                    '<option value="all">All categories</option>'
                  );
                  radioInputHTML.push(
                    '<li><input type="radio" name="filter-advanced-publications" id="filter-advanced-publications-1" dt-value="all">',
                    '<label for="filter-advanced-publications-1">All categories</label></li>'
                  );
                }

                $select.append(selectOptionHTML.join(""));
                $radioSP.append(radioInputHTML.join(""));

                selectOptionHTML = [];
                radioInputHTML = [];

                if (getCode == null) {
                  selectOptionHTML.push(
                    '<option selected value="all">All types</option>'
                  );
                  radioInputHTML.push(
                    '<li><input type="radio" name="code-advanced-publications" id="code-advanced-publications-1" dt-value="all" checked>',
                    '<label for="code-advanced-publications-1">All types</label></li>'
                  );
                } else {
                  selectOptionHTML.push(
                    '<option value="all">All types</option>'
                  );
                  radioInputHTML.push(
                    '<li><input type="radio" name="code-advanced-publications" id="code-advanced-publications-1" dt-value="all">',
                    '<label for="code-advanced-publications-1">All types</label></li>'
                  );
                }

                $selectCode.append(selectOptionHTML.join(""));
                $radioCodeSP.append(radioInputHTML.join(""));
                uniqueCategories = [
                  ...new Set(selectedValues.concat(uniqueCategories)),
                ];
                let selectOptionHTMLArray = uniqueCategories.map(
                  (categorySlug, index) => {
                    let categoryItems = groupedData[categorySlug];
                    let categoryName = categoryItems[0].category.name;
                    let selected =
                      getCate && getCate === categorySlug ? "selected" : "";

                    return `<option ${selected} value="${categorySlug}">${categoryName}</option>`;
                  }
                );

                let radioInputHTMLArray = uniqueCategories.map(
                  (categorySlug, index) => {
                    let categoryItems = groupedData[categorySlug];
                    let categoryName = categoryItems[0].category.name;
                    let selected =
                      getCate && getCate === categorySlug ? "checked" : "";
                    getCate && getCate === categorySlug
                      ? $(
                          ".cat-filter-item.item-publications .cat-filter-advanced_ttl span span, .cat-filter-advanced .list .cat-filter-advanced_ttl span span"
                        )
                          .empty()
                          .text(categoryName)
                      : "";
                    return `<li><input type="radio" name="filter-advanced-publications" id="filter-advanced-publications-${
                      index + 2
                    }" dt-value="${categorySlug}" ${selected}><label for="filter-advanced-publications-${
                      index + 2
                    }">${categoryName}</label></li>`;
                  }
                );

                $select.append(selectOptionHTMLArray.join(""));
                $radioSP.append(radioInputHTMLArray.join(""));
                uniqueCode = [...new Set(selectedCode.concat(uniqueCode))];
                let selectCodeOptionHTMLArray = uniqueCode.map(
                  (codeSlug, index) => {
                    let codeItems = groupedDataCode[codeSlug];
                    let codeName = codeItems[0].name.name;
                    let selected =
                      getCode && getCode === codeSlug ? "selected" : "";

                    return `<option ${selected} value="${codeSlug}">${codeName}</option>`;
                  }
                );

                let radioCodeInputHTMLArray = uniqueCode.map(
                  (codeSlug, index) => {
                    let codeItems = groupedDataCode[codeSlug];
                    let codeName = codeItems[0].name.name;
                    let selected =
                      getCode && getCode === codeSlug ? "checked" : "";
                    getCode && getCode === codeSlug
                      ? $(
                          ".cat-filter-item.item-publications .code-filter-advanced_ttl span span,.cat-filter-advanced .code-filter-advanced_ttl span span"
                        )
                          .empty()
                          .text(codeName)
                      : "";
                    return `<li><input type="radio" name="code-advanced-publications" id="code-advanced-publications-${
                      index + 2
                    }" dt-value="${codeSlug}" ${selected}><label for="code-advanced-publications-${
                      index + 2
                    }">${codeName}</label></li>`;
                  }
                );

                $selectCode.append(selectCodeOptionHTMLArray.join(""));
                $radioCodeSP.append(radioCodeInputHTMLArray.join(""));
              }

              if (pagesType == "publications") {
                render = `<div id="cat-04" class="opb-search-page-cat">
                        <div class="cat-inner">
                          <div class="cat-list">${dynamicHtml}</div>
                        </div>
                      </div>`;
              } else {
                render = `<div id="cat-04" class="opb-search-page-cat opb-search-page-form ">
                        <div class="cat-inner">
                          <h3 class="body-ttl">Publications search results ${
                            searchData != "" ? getSearchText : ""
                          }</h3>
                          <div class="cat-list">${dynamicHtml}</div>
                        </div>
                      </div>`;
              }
              break;
            default:
              break;
          }
          let $allData = $("#all-data");
          if (pagesType == "form" || pagesType == "publications") {
            $allData = $("#form-list-v1");
          }
          if (totalResults == 0 && searchData != "") {
            let $nextElement = $allData.next();

            $allData.addClass("none");
            $nextElement.find(".type").text(typeActive);
            $nextElement
              .find(".keysearch")
              .text(searchData !== "" ? getSearchText : "");
            render = ``;
          } else {
            $allData.removeClass("none");
          }
          $(".cat-more-btn").attr("id", "cat-more-" + typeActive);
          if (pagesType == "form" || pagesType == "publications") {
            changePage = null;
          }
          if (
            changePage == null ||
            (name && name != null) ||
            (category && category != null)
          ) {
            if (pagesType == "form" || pagesType == "publications") {
              let current = displayedResults;
              $(".itemofshow").html(
                `Showing <span>${current}</span> of ${
                  totalResults || 0
                } results`
              );
              $("#form-list-v1").html(render);
            } else {
              if (changePage !== null || searchData === "") {
                $(".cat-more").addClass("hideBtn");
                $(".txt-num").empty();
                render = `<h3 class='search-null'>How can we help you? Please enter a search term.</h3>`;
              } else {
                const listNumbResult = [
                  response.totalCount,
                  response.pagesCount,
                  response.formsCount,
                  response.pubCount,
                  response.newsCount,
                ];

                const $txtNumElements = $(".txt-num");
                $txtNumElements.empty();

                $txtNumElements.each(function (i) {
                  $(this).append("(" + listNumbResult[i] + ")");
                });
              }

              $("#all-data").html(render);
            }
            $(".opb-search-page .input-warning").removeClass("is-active");
            localStorage.removeItem("changePage");
            btnLoad();
          } else {
            fistLoad();
          }

          if (!isCustomized) {
            customizeSelect();
          }
          // isCustomized = true;
          search0215();
          setItemImageHeight();
          removeLoadingClasses();
        }, 1000);
      },
    });
  }

  function searchAll() {
    const data = {
      action: "getAll",
      page: page,
      limit: limit,
    };
    let $input = $("#search-page-form .opb-form-text");
    let searchData = $input.val();
    let searchValue = localStorage.getItem("searchValue");
    let changePage = localStorage.getItem("changePage");
    if (searchParams.has("type") && typeActive == "all") {
      searchParams.delete("type");
      searchParams.delete("group");
      searchParams.delete("cate");
    }
    if (searchData !== "" && searchData) {
      searchParams.set("s", searchData);
    }
    newURL.search = searchParams.toString();
    let updatedURL = newURL.toString();

    window.history.pushState({ path: updatedURL }, "", updatedURL);

    if (searchParams.has("s") && typeActive == "all") {
      searchData = searchParams.get("s");
      $input.val(searchParams.get("s"));
    }

    if (searchValue) {
      localValue = searchValue;
      setTimeout(() => {
        localStorage.removeItem("searchValue");
      }, 500);
    }
    if (localValue != "") {
      searchData = localValue;
    }
    if (searchData != "") {
      data["searchData"] = searchData;
    }
    data["sort"] = null;

    $.ajax({
      url: searchjson,
      type: "GET",
      dataType: "json",
      data: data,
      beforeSend: function () {
        addLoadingClasses();
      },
      success: function (response) {
        if (response && response.data) {
          var responseData = response.data;
          if (data["sort"] != null) {
            responseData.sort(function (a, b) {
              if (a.date && b.date) {
                return new Date(a.date) - new Date(b.date);
              }
              return 0;
            });
          }

          if (pagesType === "form" || pagesType === "publications") {
            if (searchData) {
              responseData = responseData.filter(function (item) {
                return (
                  item.title.toLowerCase().indexOf(searchData.toLowerCase()) !==
                  -1
                );
              });
            }
          }

          var slicedData = responseData.slice((page - 1) * limit, page * limit);
          let totalResults = slicedData.length,
            render;
          var displayedResults = responseData.length;
          const values = slicedData || [];
          let dynamicHtml = "",
            getSearchText = "";
          values?.forEach((item) => {
            const htmlRedner = renderSubItemForGetAll(item);
            dynamicHtml += htmlRedner;
          });

          setTimeout(() => {
            if (searchData != "") {
              localStorage.removeItem("changePage");
              getSearchText = " for “" + searchData + "”";
              $("#menu-tab-id .c-tab-menu_item:nth-child(1)").addClass(
                "item-active"
              );
            }
            $(".cat-more-btn").attr("id", "cat-more-all");
            if (displayedResults < limit) {
              $(".cat-more").addClass("hideBtn");
            } else {
              $(".cat-more").removeClass("hideBtn");
            }
            if (totalResults == 0 && searchData != "") {
              var $allData = $("#all-data");
              var $nextElement = $allData.next();

              $allData.addClass("none");
              $nextElement.find(".type").text(typeActive);
              $nextElement
                .find(".keysearch")
                .text(searchData !== "" ? getSearchText : "");
              render = ``;
              if (!$input.val()) {
                fistLoad();
              }
            } else if (changePage !== null || searchData === "") {
              $(".cat-more").addClass("hideBtn");
              // $("#menu-tab-id .c-tab-menu_item:nth-child(1)").removeClass(
              //   "item-active"
              // );
              $(".txt-num").empty();
              render = `<h3 class='search-null'>How can we help you? Please enter a search term.</h3>`;
            } else {
              $("#all-data").removeClass("none");

              render = `<div id="cat-01" class="opb-search-page-cat is-active">
                  <div class="cat-inner">
                    <h3 class="body-ttl">All search results ${
                      searchData != null ? getSearchText : ""
                    }</h3>
                    <div class="cat-list"> ${dynamicHtml} </div>
                  </div>
                </div>
              `;
              const listNumbResult = [
                response.totalCount,
                response.pagesCount,
                response.formsCount,
                response.pubCount,
                response.newsCount,
              ];

              const $txtNumElements = $(".txt-num");
              $txtNumElements.empty();

              $txtNumElements.each(function (i) {
                $(this).append("(" + listNumbResult[i] + ")");
              });
            }
            if (changePage !== null) {
              fistLoad();
              // $(".c-tab-menu_list li").removeClass("item-active");
            } else {
              $("#all-data").html(render);
              search0215();
              setItemImageHeight();
            }
            removeLoadingClasses();
          }, 1000);
        }
      },
    });
  }

  function loadMore(searchData = "", type = "") {
    const data = {
      page: page,
      limit: limit,
    };
    data["name"] = null;
    data["category"] = null;
    if (type) {
      data["type"] = type;
      data["action"] = "getByType";
    } else {
      data["action"] = "getAll";
    }
    if (localValue != "") {
      searchData = localValue;
    }
    if (searchData) {
      data["searchData"] = searchData;
    }

    if (type == "articles") {
      let val = $("select[name='selectPage']").val();
      if (val) {
        if (val !== "01") data["category"] = val;
      }
    } else if (type == "page") {
      let val = $("select[name='selectArticle']").val();
      if (val) {
        if (val !== "01") data["category"] = val;
      }
    } else if (type == "forms") {
      let sortCondition;
      let activeCondition;
      if (pagesType == "form") {
        activeCondition = $(".page-sub-soft li.active");
        if (activeCondition.length > 0) {
          sortCondition =
            activeCondition.text() + "-" + activeCondition.attr("data-sort");
        } else {
          sortCondition = "Title-asc";
        }
        if (sortCondition) {
          data["sort"] = sortCondition;
        }
      } else {
        activeCondition = document.querySelector(
          ".cat-filter-sort-list.sort-forms li.is-active"
        );
        if (activeCondition) {
          sortCondition = activeCondition.id;
        } else {
          sortCondition = "asc";
        }
        if (sortCondition) {
          data["sort"] = null;
        }
      }
      let val, valCode;
      if (window.innerWidth < 991) {
        val = $('.list input[name="filter-advanced-form"]:checked').attr(
          "dt-value"
        );
        valCode = $('.list input[name="code-advanced-form"]:checked').attr(
          "dt-value"
        );
      } else {
        val = $("select[name='formsSelectCategory']").val();
        valCode = $("select[name='formsSelectCode']").val();
      }
      if (val) {
        if (val !== "all") data["category"] = val;
      }
      if (valCode) {
        if (valCode !== "all") data["name"] = valCode;
      }
    } else if (type == "publications") {
      let sortCondition;
      let activeCondition;
      if (pagesType == "publications") {
        activeCondition = $(".page-sub-soft li.active");
        if (activeCondition.length > 0) {
          sortCondition =
            activeCondition.text() + "-" + activeCondition.attr("data-sort");
        } else {
          sortCondition = "Title-asc";
        }
        if (sortCondition) {
          data["sort"] = sortCondition;
        }
      } else {
        activeCondition = document.querySelector(
          ".cat-filter-sort-list.sort-publications li.is-active"
        );
        if (activeCondition) {
          sortCondition = activeCondition.id;
        } else {
          sortCondition = "asc";
        }
        if (sortCondition) {
          data["sort"] = null;
        }
      }
      let val, valCode;
      if (window.innerWidth < 991) {
        val = $(
          '.list input[name="filter-advanced-publications"]:checked'
        ).attr("dt-value");
        valCode = $(
          '.list input[name="code-advanced-publications"]:checked'
        ).attr("dt-value");
      } else {
        val = $("select[name='publicationsSelectCategory']").val();
        valCode = $("select[name='publicationsSelectType']").val();
      }
      if (val) {
        if (val !== "all") data["category"] = val;
      }
      if (valCode) {
        if (valCode !== "all") data["name"] = valCode;
      }
    }
    $.ajax({
      url: searchjson,
      type: "GET",
      dataType: "json",
      data: data,
      beforeSend: function () {
        $(".fa-spin").show();
        $(".opb-icon-search-more").hide();
        $(".cat-more").addClass("onLoad");
      },
      success: function (response) {
        let dataFilter = response.data,
          dataFilterCate = response.data;

        dataFilterCate = dataFilter.filter(function (item) {
          return item.type.toLowerCase().indexOf(type.toLowerCase()) !== -1;
        });
        dataFilter = dataFilter.filter(function (item) {
          return item.type.toLowerCase().indexOf(type.toLowerCase()) !== -1;
        });
        if (
          ((type === "articles" || type === "publications") && !data["sort"]) ||
          data["sort"] === null
        ) {
          dataFilter.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          });
        } else if (
          (type === "articles" || type === "publications") &&
          data["sort"] === null
        ) {
          dataFilter.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
          });
        } else if (data["sort"] === "desc") {
          dataFilter.sort(function (a, b) {
            return b.title.localeCompare(a.title);
          });
        } else if (data["sort"] === "asc") {
          dataFilter.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
          });
        }

        if (
          type === "forms" ||
          (type === "publications" &&
            data["sort"] &&
            data["sort"].trim().length > 0)
        ) {
          if (
            data["sort"] !== "desc" &&
            data["sort"] !== "asc" &&
            data["sort"] !== null
          ) {
            const [sortType, sortVal] = data["sort"].split("-");
            const sortFunctions = {
              Title: {
                desc: (a, b) => b.title.localeCompare(a.title),
                asc: (a, b) => a.title.localeCompare(b.title),
              },
              Category: {
                desc: (a, b) => b.category.slug.localeCompare(a.category.slug),
                asc: (a, b) => a.category.slug.localeCompare(b.category.slug),
              },
              Code: {
                desc: (a, b) =>
                  type === "publications"
                    ? b.name.slug.localeCompare(a.name.slug)
                    : b.code.localeCompare(a.code),
                asc: (a, b) =>
                  type === "publications"
                    ? a.name.slug.localeCompare(b.name.slug)
                    : a.code.localeCompare(b.code),
              },
            };

            if (
              sortFunctions.hasOwnProperty(sortType) &&
              sortFunctions[sortType].hasOwnProperty(sortVal)
            ) {
              dataFilter.sort(sortFunctions[sortType][sortVal]);
            }
          }
        }
        if (data["category"] && data["category"] !== "") {
          dataFilter = dataFilter.filter(function (item) {
            return (
              item.category.slug
                .toLowerCase()
                .indexOf(category.toLowerCase()) !== -1
            );
          });
        }
        if (pagesType === "form" || pagesType === "publications") {
          if (data["searchData"] && data["searchData"] !== "") {
            dataFilter = dataFilter.filter(function (item) {
              return (
                item.title
                  .toLowerCase()
                  .indexOf(data["searchData"].toLowerCase()) !== -1
              );
            });
            response.data = response.data.filter(function (item) {
              return (
                item.title
                  .toLowerCase()
                  .indexOf(data["searchData"].toLowerCase()) !== -1
              );
            });
          }
        }

        if (data["name"] && data["name"] !== "") {
          dataFilter = dataFilter.filter(function (item) {
            return (
              item.name.slug.toLowerCase().indexOf(name.toLowerCase()) !== -1
            );
          });
        }
        const listNumbResult = [
          response.totalCount,
          response.pagesCount,
          response.formsCount,
          response.pubCount,
          response.newsCount,
        ];
        let totalResults;
        let startIndex = (page - 1) * limit;
        let endIndex = startIndex + limit;
        let responseData = dataFilter.slice(startIndex, endIndex);
        let displayedResults = responseData.length;
        const values2 = responseData || [];
        let dynamicHtml = "";
        values2.forEach((iitem) => {
          const htmlRedner = renderSubItemForGetAll(iitem);
          dynamicHtml += htmlRedner;
        });
        let groupedData = {};
        let uniqueCategories = [];
        let groupedDataCode = {};
        let uniqueCode = [];
        let selectedValues = null;
        let selectedCode = null;
        let listCate = dataFilterCate || [];
        listCate?.forEach((item) => {
          let categorySlug = item.category.slug;

          if (!groupedData[categorySlug]) {
            groupedData[categorySlug] = [];
          }
          groupedData[categorySlug].push(item);

          if (!uniqueCategories.includes(categorySlug)) {
            uniqueCategories.push(categorySlug);
          }

          let codeSlug = item.name ? item.name.slug : [];
          if (!groupedDataCode[codeSlug]) {
            groupedDataCode[codeSlug] = [];
          }
          groupedDataCode[codeSlug].push(item);

          if (!uniqueCode.includes(codeSlug)) {
            uniqueCode.push(codeSlug);
          }
        });
        if (selectedValues === null) {
          selectedValues = uniqueCategories;
        }
        if (selectedCode === null) {
          selectedCode = uniqueCode;
        }
        setTimeout(() => {
          switch (type) {
            case "page":
              if (!isCustomized) {
                let getCate = searchParams.get("cate");
                let $select = $("#selectPage");
                $select.empty();
                let $radioSP = $(".cat-filter-item.item-page ul.list");
                $radioSP.empty();
                let selectOptionHTML = `<option ${
                  getCate == null ? "selected" : ""
                } value="all">All web pages</option>`;
                let radioInputHTML = `<li><input type="radio" name="filter-advanced-page" id="filter-advanced-1" dt-value="all" ${
                  getCate == null ? "checked" : ""
                }>`;
                radioInputHTML += `<label for="filter-advanced-1">All web pages</label></li>`;

                $select.append(selectOptionHTML);
                $radioSP.append(radioInputHTML);

                uniqueCategories = [
                  ...new Set(selectedValues.concat(uniqueCategories)),
                ];
                let htmlOptions = uniqueCategories.map(
                  (categorySlug, index) => {
                    let categoryItems = groupedData[categorySlug];
                    let categoryName = categoryItems[0].category.name;
                    let selected =
                        getCate && getCate === categorySlug ? "selected" : "",
                      checked =
                        getCate && getCate === categorySlug ? "checked" : "";

                    let optionHTML = `<option value="${categorySlug}" ${selected}>${categoryName}</option>`;
                    let radioHTML = `<li><input type="radio" name="filter-advanced-page" id="filter-advanced-${
                      index + 2
                    }" dt-value="${categorySlug}" ${checked}><label for="filter-advanced-${
                      index + 2
                    }">${categoryName}</label></li>`;
                    getCate && getCate === categorySlug
                      ? $(
                          ".cat-filter-item.item-page .cat-filter-advanced_ttl span span span"
                        )
                          .empty()
                          .text(categoryName)
                      : "";

                    return {
                      option: optionHTML,
                      radio: radioHTML,
                    };
                  }
                );
                $select.append(
                  htmlOptions.map((option) => option.option).join("")
                );

                $radioSP.append(
                  htmlOptions.map((option) => option.radio).join("")
                );
              }
              break;
            case "articles":
              if (!isCustomized) {
                let getCate = searchParams.get("cate");
                let $select = $("#selectArticle");
                $select.empty();
                let $radioSP = $(".cat-filter-item.item-articles ul.list");
                $radioSP.empty();
                let selectOptionHTML = `<option ${
                  getCate == null ? "selected" : ""
                } value="all">All articles</option>`;
                let radioInputHTML = `<li><input type="radio" name="filter-advanced-article" id="filter-advanced-article-1" dt-value="all" ${
                  getCate == null ? "checked" : ""
                }>`;
                radioInputHTML += `<label for="filter-advanced-article-1">All articles</label></li>`;

                $select.append(selectOptionHTML);
                $radioSP.append(radioInputHTML);
                uniqueCategories = [
                  ...new Set(selectedValues.concat(uniqueCategories)),
                ];
                let htmlOptions = uniqueCategories.map(
                  (categorySlug, index) => {
                    let categoryItems = groupedData[categorySlug];
                    let categoryName = categoryItems[0].category.name;
                    let selected =
                        getCate && getCate === categorySlug ? "selected" : "",
                      checked =
                        getCate && getCate === categorySlug ? "checked" : "";

                    let optionHTML = `<option value="${categorySlug}" ${selected}>${categoryName}</option>`;
                    let radioHTML = `<li><input type="radio" name="filter-advanced-article" id="filter-advanced-article-${
                      index + 2
                    }" dt-value="${categorySlug}" ${checked}><label for="filter-advanced-article-${
                      index + 2
                    }">${categoryName}</label></li>`;
                    getCate && getCate === categorySlug
                      ? $(
                          ".cat-filter-item.item-articles .cat-filter-advanced_ttl span span span"
                        )
                          .empty()
                          .text(categoryName)
                      : "";
                    return {
                      option: optionHTML,
                      radio: radioHTML,
                    };
                  }
                );

                $select.append(
                  htmlOptions.map((option) => option.option).join("")
                );
                $radioSP.append(
                  htmlOptions.map((option) => option.radio).join("")
                );
              }
              break;
            case "forms":
              if (!isCustomized) {
                let getCate = searchParams.get("cate");
                let getCode = searchParams.get("group");

                let $select = $("#formsSelectCategory");
                let $selectCode = $("#formsSelectCode");
                $select.empty();
                $selectCode.empty();
                let $radioSP, $radioCodeSP;

                if (pagesType === "form") {
                  $radioSP = $(".filter-advanced-content .content-cat ul.list");

                  $radioCodeSP = $(
                    ".filter-advanced-content .content-code ul.list"
                  );
                } else {
                  $radioSP = $(
                    ".cat-filter-item.item-forms .content-cat ul.list"
                  );
                  $radioCodeSP = $(
                    ".cat-filter-item.item-forms .content-code ul.list"
                  );
                }
                $radioSP.empty();
                $radioCodeSP.empty();

                let selectOptionHTML = [];
                let radioInputHTML = [];

                if (getCate == null) {
                  selectOptionHTML.push(
                    '<option selected value="all">All categories</option>'
                  );
                  radioInputHTML.push(
                    '<li><input type="radio" name="filter-advanced-form" id="filter-advanced-form-1" dt-value="all" checked>',
                    '<label for="filter-advanced-form-1">All categories</label></li>'
                  );
                } else {
                  selectOptionHTML.push(
                    '<option value="all">All categories</option>'
                  );
                  radioInputHTML.push(
                    '<li><input type="radio" name="filter-advanced-form" id="filter-advanced-form-1" dt-value="all">',
                    '<label for="filter-advanced-form-1">All categories</label></li>'
                  );
                }

                $select.append(selectOptionHTML.join(""));
                $radioSP.append(radioInputHTML.join(""));

                selectOptionHTML = [];
                radioInputHTML = [];

                if (getCode == null) {
                  selectOptionHTML.push(
                    '<option selected value="all">All code groups</option>'
                  );
                  radioInputHTML.push(
                    '<li><input type="radio" name="code-advanced-form" id="code-advanced-form-1" dt-value="all" checked>',
                    '<label for="code-advanced-form-1">All code groups</label></li>'
                  );
                } else {
                  selectOptionHTML.push(
                    '<option value="all">All code groups</option>'
                  );
                  radioInputHTML.push(
                    '<li><input type="radio" name="code-advanced-form" id="code-advanced-form-1" dt-value="all">',
                    '<label for="code-advanced-form-1">All code groups</label></li>'
                  );
                }

                $selectCode.append(selectOptionHTML.join(""));
                $radioCodeSP.append(radioInputHTML.join(""));
                uniqueCategories = [
                  ...new Set(selectedValues.concat(uniqueCategories)),
                ];
                let selectOptionHTMLArray = uniqueCategories.map(
                  (categorySlug, index) => {
                    let categoryItems = groupedData[categorySlug];
                    let categoryName = categoryItems[0].category.name;
                    let selected =
                      getCate && getCate === categorySlug ? "selected" : "";

                    return `<option ${selected} value="${categorySlug}">${categoryName}</option>`;
                  }
                );

                let radioInputHTMLArray = uniqueCategories.map(
                  (categorySlug, index) => {
                    let categoryItems = groupedData[categorySlug];
                    let categoryName = categoryItems[0].category.name;
                    let selected =
                      getCate && getCate === categorySlug ? "checked" : "";
                    getCate && getCate === categorySlug
                      ? $(
                          ".cat-filter-item.item-forms .cat-filter-advanced_ttl span span,.cat-filter-advanced .list .cat-filter-advanced_ttl span span"
                        )
                          .empty()
                          .text(categoryName)
                      : "";
                    return `<li><input type="radio" name="filter-advanced-form" id="filter-advanced-form-${
                      index + 2
                    }" dt-value="${categorySlug}" ${selected}><label for="filter-advanced-form-${
                      index + 2
                    }">${categoryName}</label></li>`;
                  }
                );

                $select.append(selectOptionHTMLArray.join(""));
                $radioSP.append(radioInputHTMLArray.join(""));
                uniqueCode = [...new Set(selectedCode.concat(uniqueCode))];
                let selectCodeOptionHTMLArray = uniqueCode.map(
                  (codeSlug, index) => {
                    let codeItems = groupedDataCode[codeSlug];
                    let codeName = codeItems[0].name.name;
                    let selected =
                      getCode && getCode === codeSlug ? "selected" : "";

                    return `<option ${selected} value="${codeSlug}">${codeName}</option>`;
                  }
                );

                let radioCodeInputHTMLArray = uniqueCode.map(
                  (codeSlug, index) => {
                    let codeItems = groupedDataCode[codeSlug];
                    let codeName = codeItems[0].name.name;
                    let selected =
                      getCode && getCode === codeSlug ? "checked" : "";
                    getCode && getCode === codeSlug
                      ? $(
                          ".cat-filter-item.item-forms .code-filter-advanced_ttl span span,.cat-filter-advanced .code-filter-advanced_ttl span span"
                        )
                          .empty()
                          .text(codeName)
                      : "";
                    return `<li><input type="radio" name="code-advanced-form" id="code-advanced-form-${
                      index + 2
                    }" dt-value="${codeSlug}" ${selected}><label for="code-advanced-form-${
                      index + 2
                    }">${codeName}</label></li>`;
                  }
                );

                $selectCode.append(selectCodeOptionHTMLArray.join(""));
                $radioCodeSP.append(radioCodeInputHTMLArray.join(""));
              }
              break;
            case "publications":
              if (!isCustomized) {
                let getCate = searchParams.get("cate");
                let getCode = searchParams.get("group");

                let $select = $("#publicationsSelectCategory");
                let $selectCode = $("#publicationsSelectType");
                $select.empty();
                $selectCode.empty();
                let $radioSP, $radioCodeSP;

                if (pagesType === "publications") {
                  $radioSP = $(".filter-advanced-content .content-cat ul.list");
                  $radioCodeSP = $(
                    ".filter-advanced-content .content-code ul.list"
                  );
                } else {
                  $radioSP = $(
                    ".cat-filter-item.item-publications .content-cat ul.list"
                  );
                  $radioCodeSP = $(
                    ".cat-filter-item.item-publications .content-code ul.list"
                  );
                }
                $radioSP.empty();
                $radioCodeSP.empty();
                let selectOptionHTML = [];
                let radioInputHTML = [];

                if (getCate == null) {
                  selectOptionHTML.push(
                    '<option selected value="all">All categories</option>'
                  );
                  radioInputHTML.push(
                    '<li><input type="radio" name="filter-advanced-publications" id="filter-advanced-publications-1" dt-value="all" checked>',
                    '<label for="filter-advanced-publications-1">All categories</label></li>'
                  );
                } else {
                  selectOptionHTML.push(
                    '<option value="all">All categories</option>'
                  );
                  radioInputHTML.push(
                    '<li><input type="radio" name="filter-advanced-publications" id="filter-advanced-publications-1" dt-value="all">',
                    '<label for="filter-advanced-publications-1">All categories</label></li>'
                  );
                }

                $select.append(selectOptionHTML.join(""));
                $radioSP.append(radioInputHTML.join(""));

                selectOptionHTML = [];
                radioInputHTML = [];

                if (getCode == null) {
                  selectOptionHTML.push(
                    '<option selected value="all">All types</option>'
                  );
                  radioInputHTML.push(
                    '<li><input type="radio" name="code-advanced-publications" id="code-advanced-publications-1" dt-value="all" checked>',
                    '<label for="code-advanced-publications-1">All types</label></li>'
                  );
                } else {
                  selectOptionHTML.push(
                    '<option value="all">All types</option>'
                  );
                  radioInputHTML.push(
                    '<li><input type="radio" name="code-advanced-publications" id="code-advanced-publications-1" dt-value="all">',
                    '<label for="code-advanced-publications-1">All types</label></li>'
                  );
                }

                $selectCode.append(selectOptionHTML.join(""));
                $radioCodeSP.append(radioInputHTML.join(""));
                uniqueCategories = [
                  ...new Set(selectedValues.concat(uniqueCategories)),
                ];
                let selectOptionHTMLArray = uniqueCategories.map(
                  (categorySlug, index) => {
                    let categoryItems = groupedData[categorySlug];
                    let categoryName = categoryItems[0].category.name;
                    let selected =
                      getCate && getCate === categorySlug ? "selected" : "";

                    return `<option ${selected} value="${categorySlug}">${categoryName}</option>`;
                  }
                );

                let radioInputHTMLArray = uniqueCategories.map(
                  (categorySlug, index) => {
                    let categoryItems = groupedData[categorySlug];
                    let categoryName = categoryItems[0].category.name;
                    let selected =
                      getCate && getCate === categorySlug ? "checked" : "";
                    getCate && getCate === categorySlug
                      ? $(
                          ".cat-filter-item.item-publications .cat-filter-advanced_ttl span span, .cat-filter-advanced .list .cat-filter-advanced_ttl span span"
                        )
                          .empty()
                          .text(categoryName)
                      : "";
                    return `<li><input type="radio" name="filter-advanced-publications" id="filter-advanced-publications-${
                      index + 2
                    }" dt-value="${categorySlug}" ${selected}><label for="filter-advanced-publications-${
                      index + 2
                    }">${categoryName}</label></li>`;
                  }
                );

                $select.append(selectOptionHTMLArray.join(""));
                $radioSP.append(radioInputHTMLArray.join(""));
                uniqueCode = [...new Set(selectedCode.concat(uniqueCode))];
                let selectCodeOptionHTMLArray = uniqueCode.map(
                  (codeSlug, index) => {
                    let codeItems = groupedDataCode[codeSlug];
                    let codeName = codeItems[0].name.name;
                    let selected =
                      getCode && getCode === codeSlug ? "selected" : "";

                    return `<option ${selected} value="${codeSlug}">${codeName}</option>`;
                  }
                );

                let radioCodeInputHTMLArray = uniqueCode.map(
                  (codeSlug, index) => {
                    let codeItems = groupedDataCode[codeSlug];
                    let codeName = codeItems[0].name.name;
                    let selected =
                      getCode && getCode === codeSlug ? "checked" : "";
                    getCode && getCode === codeSlug
                      ? $(
                          ".cat-filter-item.item-publications .code-filter-advanced_ttl span span,.cat-filter-advanced .code-filter-advanced_ttl span span"
                        )
                          .empty()
                          .text(codeName)
                      : "";
                    return `<li><input type="radio" name="code-advanced-publications" id="code-advanced-publications-${
                      index + 2
                    }" dt-value="${codeSlug}" ${selected}><label for="code-advanced-publications-${
                      index + 2
                    }">${codeName}</label></li>`;
                  }
                );

                $selectCode.append(selectCodeOptionHTMLArray.join(""));
                $radioCodeSP.append(radioCodeInputHTMLArray.join(""));
              }

              break;
            default:
              break;
          }
          if (pagesType == "form" || pagesType == "publications") {
            totalResults = dataFilter.length;
            let current = parseInt($(".itemofshow span").text());
            current = current + displayedResults;
            $(".itemofshow").html(
              `Showing <span>${current}</span> of ${totalResults || 0} results`
            );
          } else {
            switch (typeNumber[typeActive]) {
              case "01":
                totalResults = listNumbResult[0];
                break;
              case "02":
                totalResults = listNumbResult[1];
                break;
              case "03":
                totalResults = listNumbResult[2];
                break;
              case "04":
                totalResults = listNumbResult[3];
                break;
              case "05":
                totalResults = listNumbResult[4];
                break;
              default:
                break;
            }
          }
          let $cat_list = $(`#cat-${typeNumber[typeActive]} .cat-list`);

          $cat_list.append(dynamicHtml);
          if (!isCustomized) {
            customizeSelect();
          }
          $(".fa-spin").hide();
          $(".cat-more").removeClass("onLoad");
          $(".opb-icon-search-more").show();
          if (displayedResults < limit || endIndex >= totalResults) {
            $(".cat-more").addClass("hideBtn");
          }

          setItemImageHeight();
        }, 1000);
      },
    });
  }

  function renderSubItemForGetAll(item) {
    switch (item.type) {
      case "page":
        let breadcrums = ``;
        if (item.breadcrums && item.breadcrums.length > 0) {
          item.breadcrums.forEach((bread) => {
            breadcrums += `<li><a href="${bread.link}">${bread.name}</a></li>`;
          });
        }
        let htmlPage;
        if (typeActive == "all") {
          htmlPage = `<div class="cat-item cat-item-01">
          <div class="item-inner">
          <a href="${item.link}">
          <div class="item-text">
            <div class="item-head">
              <h3 class="item-cat item-cat-page">
                <svg class="opb-icon opb-icon-search-page">
                  <use xlink:href="#icon-search-page"></use>
                </svg>
                <strong>Web Page</strong>
              </h3>
            </div>
            <h2 class="item-ttl ">${item.title}</h2>
            <div class="item-copy">
              <p>${item.description}</p>
            </div>
            </div>
            </a>
            ${
              breadcrums
                ? `<div class="c-breadcrumb">
                              <ul class="c-breadcrumb_list">
                                ${breadcrums}
                              </ul>
                          </div>`
                : ""
            }
          </div>
        </div>`;
        } else {
          htmlPage = `<div class="cat-item cat-item-01">
          <div class="item-inner">
            <a href="${item.link}">
              <div class="item-text">
                <h2 class="item-ttl">${item.title}</h2>
                <div class="item-copy">
                  <p>${item.description}</p>
                </div>
              </div>
            </a>
            ${
              breadcrums
                ? `<div class="c-breadcrumb">
                              <ul class="c-breadcrumb_list">
                                ${breadcrums}
                              </ul>
                          </div>`
                : ""
            }
          </div>
        </div>`;
        }

        return htmlPage;

      case "articles":
        const dateCreate = new Date(item?.date);
        const formattedDate = dateCreate.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        let htmlArticles;
        if (typeActive == "all") {
          htmlArticles = `<div class="cat-item cat-item-02">
              <div class="item-inner js_arti">
                <a href="${item.link}">
                  <div class="item-text">
                    <div class="item-head">
                      <h3 class="item-cat item-cat-articles">
                        <svg class="opb-icon opb-icon-search-articles">
                          <use xlink:href="#icon-search-articles"></use>
                        </svg>
                        <strong>${item.category.name}</strong>
                      </h3>
                    </div>

                    <h2 class="item-ttl">${item.title}</h2>
                    <div class="item-copy">
                    <p>${item.description}</p>
                  </div>
                    <p class="item-date">${item.date ? formattedDate : ""}</p>
                  </div>
                  <div class="item-image">
                    <figure><img src="${item.image}" alt=""></figure>
                  </div>
                </a>
              </div>
            </div>`;
        } else {
          htmlArticles = `<div class="cat-item cat-item-02">
              <div class="item-inner arti-tab js_arti" >
                <a href="${item.link}">
                  <div class="item-text">
                  <p class="item-date">${item.date ? formattedDate : ""}</p>
                    <h2 class="item-ttl">${item.title}</h2>
                    <div class="item-copy">
                    <p>${item.description}</p>
                  </div>
                  <div class="item-head">
                  <h3 class="item-cat item-cat-articles">
                    <svg class="opb-icon opb-icon-search-articles">
                      <use xlink:href="#icon-search-articles"></use>
                    </svg>
                    <strong>${
                      item.category.name.split(" ")[1] === "letters"
                        ? item.category.name.split(" ")[1]
                        : item.category.name.split(" ")[0]
                    }</strong>
                  </h3>
                </div>
                  </div>
                  <div class="item-image">
                    <figure><img src="${item.image}" alt=""></figure>
                  </div>
                </a>
              </div>
            </div>`;
        }

        return htmlArticles;

      case "forms":
        let htmlForm;
        if (pagesType == "form") {
          htmlForm = `<a href="${item.link}" class="item item-01">
                            <div class="item-content">
                              <h3 class="item-ttl">${item.title}</h3>
                              <p>${item.description}</p>
                            </div>
                            <div class="item-cat">${item.category.name}</div>
                            <div class="item-code item-code-01 ${item.filetype}">${item.code}</div>
                        </a>`;
        } else if (typeActive == "all") {
          htmlForm = `<div class="cat-item cat-item-02 form-all">
                            <div class="item-inner">
                              <a href="${item.link}"  target="_blank">
                                <div class="item-text">
                                  <div class="item-head">
                                    <h3 class="item-cat item-cat-articles">
                                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.818115 0V16H13.298V0H0.818115ZM4.0835 10.9024L2.90127 9.6593L3.43726 9.0967L4.0835 9.78095L5.40638 8.38204L5.94237 8.94464L4.0835 10.9024ZM4.0797 7.61416L2.90127 6.37111L3.43726 5.80851L4.0835 6.49275L5.40638 5.08624L5.94237 5.64885L4.0797 7.61416ZM10.945 10.2789H7.13601V9.48444H10.945V10.2789ZM10.945 6.98693H7.13601V6.18864H10.945V6.98693Z" fill="#424242"/>
                                    </svg>
                                      <strong>Form ${item.code}</strong>
                                    </h3>
                                  </div>
                                  <h2 class="item-ttl ${item.filetype}">${item.title}</h2>
                                  <div class="item-copy">
                                  <p>${item.description}</p>
                                  <div class="item-cat">${item.category.name}</div>
                                </div>

                                </div>

                              </a>
                            </div>
                          </div>`;
        } else {
          htmlForm = `
          <a href="${item.link}" class="item item-01 ">
                            <div class="item-content">
                              <h3 class="item-ttl">${item.title}</h3>
                              <p>${item.description}</p>
                            </div>
                            <div class="item-cat">${item.category.name}</div>
                            <div class="item-code item-code-01 ${item.filetype}">${item.code}</div>
                        </a>
       `;
        }

        return htmlForm;
      case "publications":
        let htmlPublications;
        if (pagesType == "publications") {
          htmlPublications = `<a href="${item.link}" class="item item-01">
                            <div class="item-content">
                              <h3 class="item-ttl">${item.title}</h3>
                              <p>${item.description}</p>
                            </div>
                            <div class="item-cat">${item.category.name}</div>
                            <div class="item-code item-code-01 ${item.filetype}">${item.name.name}</div>
                        </a>`;
        } else if (typeActive == "all") {
          htmlPublications = `<div class="cat-item cat-item-02 form-all">
                            <div class="item-inner">
                              <a href="${item.link}" target="_blank">
                                <div class="item-text">
                                  <div class="item-head">
                                    <h3 class="item-cat item-cat-articles">
                                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.71963 4.41121V3.14019C10.1308 2.96573 10.5515 2.83489 10.9817 2.74766C11.4113 2.66044 11.8629 2.61682 12.3364 2.61682C12.6604 2.61682 12.9782 2.64174 13.2897 2.69159C13.6012 2.74143 13.9065 2.80374 14.2056 2.8785V4.07477C13.9065 3.96262 13.6045 3.87863 13.2994 3.8228C12.9939 3.76648 12.6729 3.73832 12.3364 3.73832C11.8629 3.73832 11.4081 3.79763 10.972 3.91626C10.5358 4.03439 10.1184 4.19938 9.71963 4.41121ZM9.71963 8.52336V7.25234C10.1308 7.07788 10.5515 6.94704 10.9817 6.85981C11.4113 6.77259 11.8629 6.72897 12.3364 6.72897C12.6604 6.72897 12.9782 6.75389 13.2897 6.80374C13.6012 6.85358 13.9065 6.91589 14.2056 6.99065V8.18692C13.9065 8.07477 13.6045 7.99078 13.2994 7.93495C12.9939 7.87863 12.6729 7.85047 12.3364 7.85047C11.8629 7.85047 11.4081 7.90654 10.972 8.01869C10.5358 8.13084 10.1184 8.29907 9.71963 8.52336ZM9.71963 6.46729V5.19626C10.1308 5.02181 10.5515 4.89097 10.9817 4.80374C11.4113 4.71651 11.8629 4.6729 12.3364 4.6729C12.6604 4.6729 12.9782 4.69782 13.2897 4.74766C13.6012 4.79751 13.9065 4.85981 14.2056 4.93458V6.13084C13.9065 6.01869 13.6045 5.9347 13.2994 5.87888C12.9939 5.82255 12.6729 5.79439 12.3364 5.79439C11.8629 5.79439 11.4081 5.85371 10.972 5.97234C10.5358 6.09047 10.1184 6.25545 9.71963 6.46729ZM4.11215 8.97196C4.69782 8.97196 5.26804 9.03726 5.8228 9.16785C6.37707 9.29894 6.92835 9.49533 7.47664 9.75701V2.39252C6.96573 2.09346 6.42368 1.86916 5.85047 1.71963C5.27726 1.57009 4.69782 1.49533 4.11215 1.49533C3.66355 1.49533 3.21819 1.53894 2.77607 1.62617C2.33346 1.7134 1.90654 1.84424 1.49533 2.01869V9.42056C1.93146 9.27103 2.36461 9.15888 2.79477 9.08411C3.22442 9.00935 3.66355 8.97196 4.11215 8.97196ZM8.97196 9.75701C9.52025 9.49533 10.0718 9.29894 10.6265 9.16785C11.1808 9.03726 11.7508 8.97196 12.3364 8.97196C12.785 8.97196 13.2244 9.00935 13.6546 9.08411C14.0842 9.15888 14.5171 9.27103 14.9533 9.42056V2.01869C14.5421 1.84424 14.1154 1.7134 13.6733 1.62617C13.2307 1.53894 12.785 1.49533 12.3364 1.49533C11.7508 1.49533 11.1713 1.57009 10.5981 1.71963C10.0249 1.86916 9.48287 2.09346 8.97196 2.39252V9.75701ZM8.2243 11.9626C7.62617 11.4891 6.97819 11.1215 6.28037 10.8598C5.58255 10.5981 4.85981 10.4673 4.11215 10.4673C3.45171 10.4673 2.76012 10.5919 2.03738 10.8411C1.31464 11.0903 0.635514 11.4766 0 12V1.15888C0.548287 0.785047 1.19327 0.498442 1.93495 0.299065C2.67614 0.0996885 3.40187 0 4.11215 0C4.83489 0 5.54218 0.0934579 6.23402 0.280374C6.92536 0.46729 7.58879 0.747664 8.2243 1.1215C8.85981 0.747664 9.52349 0.46729 10.2153 0.280374C10.9067 0.0934579 11.6137 0 12.3364 0C13.0467 0 13.7727 0.0996885 14.5144 0.299065C15.2556 0.498442 15.9003 0.785047 16.4486 1.15888V12C15.8255 11.4766 15.1497 11.0903 14.4209 10.8411C13.6917 10.5919 12.9969 10.4673 12.3364 10.4673C11.5888 10.4673 10.866 10.5981 10.1682 10.8598C9.47041 11.1215 8.82243 11.4891 8.2243 11.9626Z" fill="#656565"/>
                                    </svg>
                                      <strong>${item.name.name} Publication</strong>
                                    </h3>
                                  </div>
                                  <h2 class="item-ttl ${item.filetype}">${item.title}</h2>
                                  <div class="item-copy">
                                  <p>${item.description}</p>
                                  <div class="item-cat">${item.category.name}</div>
                                </div>

                                </div>

                              </a>
                            </div>
                          </div>`;
        } else {
          htmlPublications = `
          <a href="${item.link}" class="item item-01">
                            <div class="item-content">
                              <h3 class="item-ttl">${item.title}</h3>
                              <p>${item.description}</p>
                            </div>
                            <div class="item-cat">${item.category.name}</div>
                            <div class="item-code item-code-01 ${item.filetype}">${item.name.name}</div>
                        </a>
       `;
        }

        return htmlPublications;

      default:
        return "";
    }
  }
  function headerSearch0216() {
    $(".search-header-icon,.search-header-from .overlay").click(function () {
      $(".search-header-icon").toggleClass("is-active");
      $(".search-header-from").toggleClass("is-active");
      $("html").toggleClass("is-hidden");
      $("html").toggleClass("disableScroll");
      return false;
    });

    let $inputs = $(
      ".form-control.opb-form-text,.opb-form-text.search-header-input"
    );
    function checkAndRemoveClass() {
      if ($(window).width() > 768) {
        if ($(".search-header-icon").hasClass("is-active")) {
          $(".search-header-icon").removeClass("is-active");
          $(".search-header-from").removeClass("is-active");
          $("html").removeClass("is-hidden");
          $("html").removeClass("disableScroll");
        }
      }
    }
    checkAndRemoveClass();
    $(window).resize(function () {
      checkAndRemoveClass();
    });

    function init() {
      $inputs.each(function (index, element) {
        initAwesomeplete(element);
      });
    }

    function initAwesomeplete(input) {
      var $input = $(input),
        jsonFetched = false,
        awesomplete = new Awesomplete(input, {
          minChars: 3,
          autoFirst: false,
          maxItems: 5,
        });

      // $input.on("awesomplete-open", function (e) {
      //   var $list = $input.next(".input-show ul");
      //   $list.addClass("abt-search-list-dropdown").append(liItems);
      // });

      $input.on("keyup", function () {
        if ($input.val().length > 2 && !jsonFetched) {
          $.ajax({
            url: searchjson,
            type: "GET",
            dataType: "json",
          }).done(function (data) {
            awesomplete.list = data.keywords;
            jsonFetched = true;
          });
        }
      });
    }
    init();
  }
  function headerSearch0215() {
    let $form = $("#search-header");
    let $input = $(".search-header-input");
    if ($input.val() != "") {
      $input.parents().addClass("is-input");
      $(".search-header-from .input-clear").addClass("is-active");
      $(".form-inner_custom .input-clear").addClass("is-active");
      $(".opb-search-page .input-warning").removeClass("is-active");
      $(".search-header-from .input-warning").removeClass("is-active");
    }
    $input.keyup(function () {
      var value = $(this).val().toLowerCase();
      if ($(this).val() == "") {
        $(this).parents().removeClass("is-input");
        $(".search-header-from .input-clear").removeClass("is-active");
        $(".form-inner_custom .input-clear").removeClass("is-active");
        $(".search-header-from .input-warning").addClass("is-active");
      } else {
        $(this).parents().addClass("is-input");
        $(".search-header-from .input-clear").addClass("is-active");
        $(".form-inner_custom .input-clear").addClass("is-active");
        $(".search-header-from .input-warning").removeClass("is-active");
      }
    });

    $(".search-header-from .input-clear,.form-inner_custom .input-clear").click(
      function () {
        $input.val("");
        $(this).removeClass("is-active");
        $form.removeClass("is-input");
      }
    );
  }

  function homepage0215() {
    $(".carousel-item").each(function (i, e) {
      $img = $(e).getElem("img");
      if ($img.attr("src") == "") {
        $img.addClass("is-none");
        $img.attr(
          "src",
          "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        );
      }
    });
    if (t(".opb-homepage").length) {
      var $item = t("#carouselHomepageIndicators").getElem(".carousel-item");
      if ($item.length == 1) {
        t(".opb-homepage-controls").hide();
        t(".opb-page-header").addClass("is-one");
        t("#carouselHomepageIndicators").addClass("is-one");
      }
      var e = t("#carouselHomepageIndicators")
        .getElem(".carousel-item")
        .first()
        .getElem("img");
      t(".opb-page-header").getElem("h1").html(e.attr("data-slide-title"));
      t(".opb-page-header").getElem("h4").html(e.attr("data-slide-desc"));
      if (e.attr("data-slide-desc") == "") {
        t(".opb-page-header").getElem("h4").addClass("is-none");
      } else {
        t(".opb-page-header").getElem("h4").removeClass("is-none");
      }
      if (
        e.attr("src") ==
        "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
      ) {
        $(".carousel-indicators").addClass("is-none-image");
      } else {
        $(".carousel-indicators").removeClass("is-none-image");
      }
      t(".opb-page-header")
        .getElem("a")
        .attr("href", e.attr("data-slide-url"))
        .getElem("span")
        .text(e.attr("data-slide-subtitle"));
      t("#carouselHomepageIndicators").on("slide.bs.carousel", function (e) {
        var a = t(".carousel-indicators"),
          n = "[data-slide-to=" + e.to + "]",
          i = t(e.relatedTarget).getElem("img"),
          o = t(".opb-page-header").getElem("h1"),
          v = t(".opb-page-header").getElem("h4"),
          s = t(".opb-page-header").getElem("a");
        a.find("li").removeClass("active");
        a.find(n).addClass("active");
        o.html(i.attr("data-slide-title"));
        v.html(i.attr("data-slide-desc"));
        t(".opb-page-header")
          .getElem("a")
          .attr("intial-position", e.to + 1);
        if (i.attr("data-slide-desc") == "") {
          v.addClass("is-none");
        } else {
          v.removeClass("is-none");
        }
        if (
          i.attr("src") ==
          "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        ) {
          $(".carousel-indicators").addClass("is-none-image");
        } else {
          $(".carousel-indicators").removeClass("is-none-image");
        }
        s.attr("href", i.attr("data-slide-url"))
          .getElem("span")
          .text(i.attr("data-slide-subtitle"));
      });
    }
    function checkWidth() {
      var windowsize = $(window).width();
      if (windowsize < 768) {
        $("#carouselHomepageIndicators").carousel({
          interval: false,
        });
      } else {
        $("#carouselHomepageIndicators").carousel({
          interval: 5000,
        });
      }
    }
    checkWidth();
    $(window).resize(checkWidth);
  }

  function search0215() {
    var $form = $("#search-page-form");
    var $input = $(".opb-search-page .opb-form-text");
    var $inputs = $("#search-data2");
    if ($inputs.val() != "") {
      $inputs.parents().addClass("is-input");
      $(".form-inner_custom .input-clear").addClass("is-active");
      $(".opb-search-page .input-warning").removeClass("is-active");
    }
    if ($input.val() != "") {
      $(".opb-search-page .opb-form-search-page").addClass("is-input");
      $(".opb-search-page .input-clear").addClass("is-active");
      $(".opb-search-page .input-warning").removeClass("is-active");
    }
    $input.keyup(function () {
      if ($(this).val() == "") {
        $(this).parents().removeClass("is-input");
        $(".opb-search-page .input-clear").removeClass("is-active");
      } else {
        $(this).parents().addClass("is-input");
        $(".opb-search-page .input-clear").addClass("is-active");
        $(".opb-search-page .input-warning").removeClass("is-active");
      }
    });

    $(".opb-search-page .input-clear").click(function () {
      $input.val("");
      $(this).removeClass("is-active");
      $form.removeClass("is-input");
      $(
        ".opb-search-page #form-list-v1,.opb-search-page #all-data"
      ).removeClass("none");
    });

    /* Tab
     ********************************************** */

    $(".opb-search-page-body .opb-search-page-cat:first-child").addClass(
      "is-active"
    );

    /* Custome Select
     ********************************************** */
    var $customeSelect = $(".js-custom-select");
    if ($customeSelect.length < 1) {
      return false;
    }

    $(".cat-filter-advanced_ttl").click(function () {
      if (
        pagesType == "form" ||
        $(".item-forms.is-active").length > 0 ||
        $(".item-publications.is-active").length > 0 ||
        pagesType == "publications"
      ) {
        $(this)
          .parents(".cat-filter-advanced")
          .find(".cat-filter-advanced_content")
          .addClass("is-active");
      } else {
        $(this).next().addClass("is-active");
      }
    });

    $(".code-filter-advanced_ttl").click(function () {
      if (
        pagesType == "form" ||
        $(".item-forms.is-active").length > 0 ||
        $(".item-publications.is-active").length > 0 ||
        pagesType == "publications"
      ) {
        $(this)
          .parents(".cat-filter-advanced")
          .find(".cat-filter-advanced_content")
          .addClass("is-active");
      }
    });

    $(".content-body_btn").click(function () {
      $(this).parents(".cat-filter-advanced_content").removeClass("is-active");
      $(this).parents(".code-filter-advanced_content").removeClass("is-active");
    });

    $(".input-clear,.noResults-reset").on("click", function (event) {
      localStorage.removeItem("searchValue");
      localValue = "";
      let inputId = $(event.target).attr("class");
      if (searchParams.has("s")) {
        searchParams.delete("s");
        newURL.search = searchParams.toString();
        let updatedURL = newURL.toString();

        window.history.pushState({ path: updatedURL }, "", updatedURL);
      }

      if (pagesType == "form") {
        setTimeout(() => {
          if (inputId == "noResults-reset") {
            searchParams.delete("type");
            searchParams.delete("cate");
            searchParams.delete("group");
            searchParams.delete("s");
            resetSearch();
          }
          if (searchParams.has("type")) {
            let typeCate = searchParams.get("cate"),
              typeName = searchParams.get("group"),
              typeActive = searchParams.get("type");
            searchByType(typeActive, typeCate, null, typeName);
          } else {
            searchByType("forms");
          }
        }, 100);
      } else if (pagesType == "publications") {
        setTimeout(() => {
          if (inputId == "noResults-reset") {
            searchParams.delete("type");
            searchParams.delete("cate");
            searchParams.delete("group");
            searchParams.delete("s");
            resetSearch();
          }
          if (searchParams.has("type")) {
            let typeCate = searchParams.get("cate"),
              typeName = searchParams.get("group"),
              typeActive = searchParams.get("type");
            searchByType(typeActive, typeCate, null, typeName);
          } else {
            searchByType("publications");
          }
        }, 100);
      } else {
        $("#search-data,#search-data2,#search-data3").val("");
        $(".input-clear").removeClass("is-active");
        $(".input-warning").removeClass("is-active");
        $("#search-page-form,#search-header").removeClass("is-input");
        if (inputId == "noResults-reset") {
          if (typeActive == "all" && !searchParams.has("type")) {
            searchParams.delete("type");
            searchParams.delete("cate");
            searchParams.delete("group");
            searchParams.delete("s");
            searchAll();
          } else {
            searchParams.delete("cate");
            searchParams.delete("group");
            searchParams.delete("s");
            const filterText = {
              page: {
                categoryItem: ".cat-filter-item.item-page",
                selectText: "All web pages",
                advancedText: "All web pages",
              },
              articles: {
                categoryItem: ".cat-filter-item.item-articles",
                selectText: "All articles",
                advancedText: "All articles",
              },
              forms: {
                categoryItem: ".cat-filter-item.item-forms",
                selectText: "All categories",
                codeText: "All code groups",
                advancedCategoryText: "All categories",
                advancedCodeText: "All code groups",
              },
              publications: {
                categoryItem: ".cat-filter-item.item-publications",
                selectText: "All publications",
                codeText: "All type",
                advancedCategoryText: "All publications",
                advancedCodeText: "All type",
              },
            };

            const filterInfo = filterText[typeActive];
            const {
              categoryItem,
              selectText,
              codeText,
              advancedCategoryText,
              advancedCodeText,
            } = filterInfo;

            $(categoryItem + " .select-selected").text(selectText);
            $(categoryItem + " .cat-filter-advanced_ttl span span span")
              .empty()
              .text(advancedCategoryText);

            if (typeActive === "forms" || typeActive === "publications") {
              $(categoryItem + " .cat-filter-select .select-selected").text(
                selectText
              );
              $(categoryItem + " .code-filter-select .select-selected").text(
                codeText
              );
              $(".cat-filter-advanced .cat-filter-advanced_ttl span span")
                .empty()
                .text(advancedCategoryText);
              $(".cat-filter-advanced .code-filter-advanced_ttl span span")
                .empty()
                .text(advancedCodeText);
            }
            searchByType(typeActive);
          }
        } else {
          searchParams.delete("s");
          if (searchParams.has("type")) {
            let typeCate = searchParams.get("cate"),
              typeName = searchParams.get("group"),
              typeActive = searchParams.get("type");
            searchByType(typeActive, typeCate, null, typeName);
          } else {
            searchAll();
          }
        }
      }
    });
    $(".backPopup").click(function () {
      if (
        pagesType == "form" ||
        $(".item-forms.is-active").length > 0 ||
        $(".item-publications.is-active").length > 0 ||
        pagesType == "publications"
      ) {
        $(this)
          .parents(".cat-filter-advanced")
          .find(".cat-filter-advanced_content")
          .removeClass("is-active");
      } else {
        $(this).parent().removeClass("is-active");
      }
    });
  }
  function setItemImageHeight() {
    $(".js_arti").each(function () {
      var totalHeight = $(this).outerHeight();
      $(this)
        .find(".item-image")
        .css("height", totalHeight + "px");
    });
  }
  function btnLoad() {
    $("#cat-more-" + typeActive).off("click");
    $("#cat-more-" + typeActive).click(function (e) {
      let $input = $(".opb-search-page .opb-form-text");
      page++;
      let searchValue = $input.val();
      if (typeActive == "all") {
        loadMore(searchValue);
      } else {
        loadMore(searchValue, typeActive);
      }
      return false;
    });
  }
  function resetSearch() {
    var catFilterItems = $(".cat-filter-advanced"),
      catSelect = $(".cat-filter-selectV1 .select-selected"),
      codeSelect = $(".code-filter-selectV1 .select-selected"),
      formChecked = $('input[name="code-advanced-form"]:first'),
      catFormChecked = $('input[name="filter-advanced-form"]:first'),
      pubChecked = $('input[name="code-advanced-publications"]:first'),
      catPubChecked = $('input[name="filter-advanced-publications"]:first');

    pagesType === "form"
      ? (catFilterItems.find(".cat-filter-advanced_ttl span span").empty(),
        catFilterItems.find(".code-filter-advanced_ttl span span").empty(),
        catFilterItems
          .find(".cat-filter-advanced_ttl span span")
          .text("All categories"),
        catFilterItems
          .find(".code-filter-advanced_ttl span span")
          .text("All code groups"),
        catSelect.text("All categories"),
        codeSelect.text("All code groups"),
        $(".cat-filter-selectV1 option").eq(0).prop("selected", true),
        $(".code-filter-selectV1 option").eq(0).prop("selected", true),
        formChecked.prop("checked", true),
        catFormChecked.prop("checked", true))
      : pagesType === "publications"
      ? (catFilterItems.find(".cat-filter-advanced_ttl span span").empty(),
        catFilterItems.find(".code-filter-advanced_ttl span span").empty(),
        catFilterItems
          .find(".cat-filter-advanced_ttl span span")
          .text("All publications"),
        catFilterItems
          .find(".code-filter-advanced_ttl span span")
          .text("All types"),
        catSelect.text("All categories"),
        codeSelect.text("All code groups"),
        $(".cat-filter-selectV1 option").eq(0).prop("selected", true),
        $(".code-filter-selectV1 option").eq(0).prop("selected", true),
        catSelect.text("All types"),
        codeSelect.text("All publications"),
        pubChecked.prop("checked", true),
        catPubChecked.prop("checked", true))
      : null;

    $(".opb-search-page .opb-form-text").val("");
    $("#search-page-form,#search-header").removeClass("is-input");
    $(".input-clear").removeClass("is-active");
    $(".input-warning").removeClass("is-active");
  }
  let inputStyles = $(".opb-form-text");
  let divs = $(".input-clear use");

  inputStyles.focus(function () {
    let index = inputStyles.index(this);
    let div = divs.eq(index);
    div.attr("xlink:href", "#icon-search-clear_on");
  });

  inputStyles.blur(function () {
    let index = inputStyles.index(this);
    let div = divs.eq(index);
    div.attr("xlink:href", "#icon-search-clear");
  });
  function addLoadingClasses() {
    $(".opb-search-page .loading").show();
    $(".opb-search-page .cat-more").addClass("loada");
    $("#all-data").addClass("loada");
    $("#form-list-v1").addClass("loada");
    $(".note").addClass("loada");
    $("html").addClass("disableScroll");
  }

  function removeLoadingClasses() {
    $(".opb-search-page .loading").hide();
    $(".opb-search-page .cat-more").removeClass("loada");
    $("#all-data").removeClass("loada");
    $("#form-list-v1").removeClass("loada");
    $(".note").removeClass("loada");
    $("html").removeClass("disableScroll");
  }
  $("#search-data2").on("input", function () {
    var inputValue = $(this).val();
    $("#search-data3").val(inputValue);
  });

  $("#search-data3").on("input", function () {
    var inputValue = $(this).val();
    $("#search-data2").val(inputValue);
  });
});
