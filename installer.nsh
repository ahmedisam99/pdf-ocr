!macro customInstall
    ; TODO - append bin directory to %PATH%
    !system "echo '' > ${BUILD_RESOURCES_DIR}/${PROJECT_DIR}/customInstall"
!macroend

!macro customUnInstall
    ; TODO - remove bin directory from %PATH%
    !system "echo '' > ${BUILD_RESOURCES_DIR}/${PROJECT_DIR}/customUnInstall"
!macroend
