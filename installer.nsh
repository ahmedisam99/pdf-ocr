!macro customInstall
    ; TODO - append GraphicsMagick (gm.exe) directory to %PATH%
    !system "echo '' > ${BUILD_RESOURCES_DIR}/${PROJECT_DIR}/customInstall"
!macroend

!macro customUnInstall
    ; TODO - remove GraphicsMagick (gm.exe) directory from %PATH%
    !system "echo '' > ${BUILD_RESOURCES_DIR}/${PROJECT_DIR}/customUnInstall"
!macroend
