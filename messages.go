package main

const ERROR_client_id_NOT_PROVIDED = "`client_id` 쿼리가 없어 요청을 처리할 수 없습니다."
const ERROR_redirect_uri_NOT_PROVIDED = "`redirect_uri` 쿼리가 없어 요청을 처리할 수 없습니다."
const ERROR_response_type_NOT_PROVIDED = "`response_type` 쿼리가 없어 요청을 처리할 수 없습니다."

const ERROR_client_id_NOT_MATCH = "요청한 `client_id` 쿼리에 맞는 클라이언트를 찾을 수 없습니다.\n서비스가 변경되었거나 삭제되었을 가능성이 높습니다."
const ERROR_redirect_uri_NOT_MATCH = "요청한 `redirect_uri`와 가입된 정보가 다릅니다.\n개인정보 보호를 위해 미리 기입한 url 이외의 위치로는 정보를 전달할 수 없습니다."
const ERROR_response_type_NOT_MATCH = "요청한 `response_type`은 지원하지 않는 타입입니다.\n`response_type=code`의 오타일 가능성이 높습니다."

const ERROR_user_id_NOT_PROVIDED = "아이디, 비밀번호를 입력해 주세요."
const ERROR_user_password_NOT_PROVIDED = "아이디, 비밀번호를 입력해 주세요."
const ERROR_captcha_NOT_PROVIDED = "CAPTCHA 오류.\n관리자의 동의 없는 자동화는 금지됩니다. (다시시도해 보세요)"

const ERROR_user_id_NOT_MATCH = "사용자를 찾을 수 없습니다.\n아이디, 비밀번호를 확인해 주세요."
const ERROR_user_password_NOT_MATCH = "비밀번호가 맞지 않습니다.\n아이디, 비밀번호를 확인해 주세요."

const ERROR_ident_code_NOT_PROVIDED = "`code` 필드가 없어 요청을 처리할 수 없습니다."
const ERROR_grant_type_NOT_PROVIDED = "`grant_type` 필드가 없어 요청을 처리할 수 없습니다."
const ERROR_client_secret_NOT_PROVIDED = "`client_secret` 필드가 없어 요청을 처리할 수 없습니다."
const ERROR_ident_client_id_NOT_PROVIDED = "`client_id` 필드가 없어 요청을 처리할 수 없습니다."
const ERROR_ident_redirect_uri_NOT_PROVIDED = "`redirect_uri` 필드가 없어 요청을 처리할 수 없습니다."

const ERROR_ident_code_NOT_MATCH = "요청한 `code`가 맞지 않습니다.\n이미 사용한 코드이거나, 유효기간이 지난 코드일 가능성이 높습니다."
const ERROR_grant_type_NOT_MATCH = "요청한 `grant_type`은 지원하지 않는 타입입니다.\n`authorization_code`의 오타일 가능성이 높습니다."
const ERROR_client_secret_NOT_MATCH = "요청한 `client_secret`가 맞지 않습니다."
const ERROR_ident_client_id_NOT_MATCH = "요청한 `client_id` 필드에 맞는 클라이언트를 찾을 수 없습니다.\n서비스가 변경되었거나 삭제되었을 가능성이 높습니다."
const ERROR_ident_redirect_uri_NOT_MATCH = "요청한 `redirect_uri`와 가입된 정보가 다릅니다."

const ERROR_user_MISSING = "요청한 유저의 정보가 통합 로그인 시스템에서 이미 삭제되었습니다.\n관리자에게 문의하십시오."
