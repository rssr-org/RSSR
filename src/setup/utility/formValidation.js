/**
 * form validation
 * check the form have any error then retrun true or false.
 */
export const formValidation = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const $form = $(e.target);
    if ($form[0].checkValidity() === false) {
        $form.addClass('was-validated');
        return false;
    }

    $form.removeClass('was-validated');
    return true;
}