/**
 * creates a simple tooltip that appears when hovering over target elements
 * 
 * @param {string} target_items - a jQuery selector for the elements that should display tooltips
 * @param {string} name - a class name for styling the tooltips
 */
function simple_tooltip(target_items, name) {
  // iterates over each target item that matches the selector
    $(target_items).each(function (i) {
      $("body").append(
        "<div class='" +
          name +
          "' id='" +
          name +
          i +
          "'><p>" +
          $(this).attr("title") +
          "</p></div>"
      );

      // stores the reference to the created tooltip element
      var my_tooltip = $("#" + name + i);
      
      // removes the title attribute from the target element to prevent default browser tooltips
      $(this)
        .removeAttr("title")
        .mouseover(function () {
          my_tooltip.css({ opacity: 1.0, display: "none" }).fadeIn(200);
        })
        .mousemove(function (kmouse) {
          my_tooltip.css({
            left: kmouse.pageX + 15,
            top: kmouse.pageY + 15,
          });
        })
        .mouseout(function () {
          my_tooltip.fadeOut(200);
        });
    });
  }


/**
 * function to calculate the number of properties/size in an array or object
 * 
 * @param {object|array} array - the array or object to calculate the sizxe for
 * @returns {number} - the size of the array/object
 */
function sizeOfArray(array) {
    // A variable to store
    // the size of arrays
    let size = 0;
  
    // Traversing the array
    for (let key in array) {
      // Checking if key is present
      // in arrays or not
      if (array.hasOwnProperty(key)) {
        size++;
      }
    }
  
    // Return the size
    return size;
  };
  
  /**
   * toggles the visibility of items and switchs the caret icon between a minus and a plus symbol
   * 
   * @param {string} items_class - a jQuery selector for the items to show/hide 
   * @param {string} caret_id - a jQuery selector for the caret icon that toggles
   */
  function itemsCompressExpand(items_class, caret_id) {
    // check if the caret currently shows a minus icon (expanded state)
    if ($(caret_id).hasClass("fa-minus-square")) {
      $(caret_id).removeClass("fa-minus-square").addClass("fa-plus-square");
      $(items_class).hide();
    } else if ($(caret_id).hasClass("fa-plus-square")) {
      // if the caret shows a plus icon, switch to the minus icon and show the items
      $(caret_id).removeClass("fa-plus-square").addClass("fa-minus-square");
      $(items_class).show();
    }
  }
  
  /**
   * toggles the visibility of a section with a sliding effect, switching the caret icon between minus and plus
   * 
   * @param {string} section_id - a jQuery selector for the section to slide up or down
   * @param {string} caret_id - a jQuery selector for the caret icon that toggles
   */
  function sectionCompressExpand(section_id, caret_id) {
    if ($(caret_id).hasClass("fa-minus-square")) {
      $(caret_id).removeClass("fa-minus-square").addClass("fa-plus-square");
      $(section_id).slideUp();
    } else if ($(caret_id).hasClass("fa-plus-square")) {
      $(caret_id).removeClass("fa-plus-square").addClass("fa-minus-square");
      $(section_id).slideDown();
    }
  }
  