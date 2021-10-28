export interface HWP_Header_T {
    /** signature. 문서 파일은 "HWP Document File" */
    signature?: string
    /** 
     * 파일 버전. 0xMMnnPPrr의 형태(예 5.0.3.0)
     * * MM: 문서 형식의 구조가 완전히 바뀌는 것을 나타냄. 숫자가 다르면 구 버전과 호환 불가능.
     * * nn: 큰 구조는 동일하나, 큰 변화가 있는 것을 나타냄. 숫자가 다르면 구 버전과 호환 불가능.
     * 구조는 동일, Record가 추가되었거나, 하위 버전에서 호환되지 않는 정보가 추가된 것을 나타냄. 숫자가 달라도 구 버전과 호환 가능.
     * * rr: Record에 정보들이 추가된 것을 나타냄. 숫자가 달라도 구 버전과 호환 가능.
     */
    version?: [number,number,number,number]
    /** 압축 여부 */
    isCompressed?: boolean
    /** 암호 설정 여부 */
    isLocked?: boolean
    /** 배포용 문서 여부 */
    isPublic?: boolean
    /** 스크립트 저장 여부 */
    isScriptContained?: boolean
    /** DRM 보안 여부 */
    isDRMsecurity?: boolean
    /** XMLTemplate 스토리지 존재 여부 */
    isXMLTemplate?: boolean
    /** 문서 이력 관리 존재 여부 */
    isHistoryExist?: boolean
    /** 전자 서명 존재 여부 */
    isDigitalSignatureExist?: boolean
    /** 공인 인증서 암호화 여부 */
    isSecuredAC?: boolean
    /** 전자 서명 예비 저장 여부 */
    isDigitalSingatureSaved?: boolean
    /** 공인 인증서 DRM 보안 문서 여부 */
    isDRMsecurityWithAC?: boolean
    /** CCL 문서 여부 */
    isCCL?: boolean
    /** 모바일 최적화 여부 */
    isMobileOptimized?: boolean
    /** 개인 정보 보안 문서 여부 */
    isPrivacySecurityDOC?: boolean
    /** 변경 추적 문서 여부 */
    isHistoryTrackDOC?: boolean
    /** 공공누리(KOGL) 저작권 문서 */
    isKOGLdoc?: boolean
    /** 비디오 컨트롤 포함 여부 */
    isVideocontrollContained?: boolean
    /** 차례 필드 컨트롤 포함 여부 */
    isTurnFieldContained?: boolean
    /** 예약 18~32bit */
    extBuffer?: Buffer

    /** CCL, 공공누리 라이선스 정보 */
    license?: string

}