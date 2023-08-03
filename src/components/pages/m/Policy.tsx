import Image from "next/image";

const Policy = () => {
  return (
    <main
      className={"bg-white max-w-auto mx-auto mt-10 p-5 gap-3 min-w-[360px]"}
    >
      <div className={"mb-5 "}>
        <h1>㈜그네테크홀딩스 개인정보 처리방침</h1>
        <p>
          “개인정보 처리방침”이란 이용자가 안심하고 서비스를 이용할 수 있도록
          회사가 준수해야 할 지침을 의미하며, ㈜그네테크홀딩스(이하 ‘회사’라고
          합니다)는 리스크웨더(이하 ‘서비스’라고 합니다) 가입자에게
          정보통신서비스제공자가 준수하여야 하는 대한민국의 관계 법령 및
          개인정보보호 규정, 가이드라인을 준수하여 개인정보 처리방침을
          제공합니다.
        </p>
      </div>
      <div className={"mb-5"}>
        <h2>개인정보 수집</h2>
        <p>
          서비스 제공을 위한 필요 최소한의 개인정보를 수집합니다. 회원 가입 시
          또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램
          등을 통해 서비스 제공을 위해 필요 최소한의 개인정보를 수집하고
          있습니다.
        </p>
      </div>
      <ul>
        <li>[서비스 계정 가입 시]</li>
        <ul>
          <li>필수</li>
          <ul>
            <li>이메일</li>
            <li>이름(닉네임)</li>
            <li>프로필사진</li>
            <li>연락처</li>
            <li>서비스 이용내역</li>
          </ul>
          <li>선택</li>
          <ul>
            <li>선호 자산 정보</li>
            <li>계좌 보유 증권사</li>
          </ul>
        </ul>
        <div className={"mb-5 mt-5"}>
          <li>[본인인증 시]</li>
          <ul>
            <li>이름</li>
            <li>성별</li>
            <li>생년월일</li>
            <li>휴대전화번호</li>
            <li>통신사업자</li>
            <li>내/외국인 여부</li>
            <li>암호화된 이용자 확인값(CI)</li>
            <li>중복가입확인정보(DI)</li>
          </ul>
        </div>

        <li>[법정대리인 동의 시]</li>
        <ul>
          <li>
            법정대리인 정보(이름, 성별, 생년월일, 휴대전화번호, 통신사업자,
            내/외국인 여부, 암호화된 이용자 확인값(CI), 중복가입확인정보(ID)
          </li>

          <li>[유료서비스 이용 시]</li>
          <ul>
            <li>신용카드 결제 시:</li>
            <ul>
              <li>카드번호(일부)</li>
              <li>카드사명 등</li>
            </ul>
            <li>휴대전화번호 결제 시:</li>
            <ul>
              <li>휴대전화번호</li>
              <li>결제승인번호 등</li>
            </ul>
            <li>계좌이체 시:</li>
            <ul>
              <li>예금주명</li>
              <li>계좌번호</li>
              <li>계좌은행 등</li>
            </ul>
            <li>상품권 이용 시:</li>
            <ul>
              <li>상품권 번호</li>
              <li>해당 사이트 아이디</li>
            </ul>
          </ul>

          <div className={" mt-5"}>
            <li>[환불처리 시]</li>
            <ul>
              <li>계좌은행</li>
              <li>계좌번호</li>
              <li>예금주명</li>
              <li>이메일</li>
            </ul>
          </div>

          <div className={"mt-5"}>
            <li>[현금영수증 발행 시]</li>
            <ul>
              <li>휴대전화번호</li>
              <li>현금영수증 카드번호</li>
            </ul>
          </div>

          <div className={"mb-5 mt-5"}>
            <li>[고객상담 시]</li>
            <p>
              고객센터로 문의 및 상담 시 상담 처리를 위한 추가적인 정보를 수집할
              수 있습니다.
            </p>
            <p>
              • 필수정보란? : 해당 서비스의 본질적 기능을 수행하기 위한 정보
            </p>
            <p>
              • 선택정보란? : 보다 특화된 서비스를 제공하기 위해 추가 수집하는
              정보 (선택 정보를 입력하지 않은 경우에도 서비스 이용 제한은
              없습니다.)
            </p>
            <p></p>
          </div>
        </ul>

        <div className={"mb-5 mt-5"}>
          <h2>개인정보 수집 방법</h2>
          <p>
            개인정보를 수집하는 경우에는 원칙적으로 사전에 이용자에게 해당
            사실을 알리고 동의를 구하고 있으며, 아래와 같은 방법을 통해
            개인정보를 수집합니다.
          </p>
          <ul>
            <li>
              회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해
              동의를 하고 직접 정보를 입력하는 경우
            </li>
            <li>계좌를 보유한 증권사에서 개인 투자 정보를 제공받은 경우</li>
            <li>제휴 서비스 또는 단체 등으로부터 개인정보를 제공받은 경우</li>
            <li>고객센터를 통한 상담 과정에서 웹페이지, 메일, 팩스, 전화 등</li>
            <li>온·오프라인에서 진행되는 이벤트/행사 등 참여</li>
          </ul>
          <p>
            서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와
            같습니다.
          </p>
        </div>

        <div className={"mb-5 mt-5"}>
          <ul>
            <li>
              PC웹, 모바일 웹/앱 이용 과정에서 단말기정보(OS, 화면사이즈,
              디바이스 아이디, 폰기종, 단말기 모델명)
            </li>
            <li>IP주소</li>
            <li>쿠키</li>
            <li>방문일시</li>
            <li>부정이용기록</li>
            <li>
              서비스 이용 기록 등의 정보가 자동으로 생성되어 수집될 수 있습니다.
            </li>
          </ul>
        </div>

        <div className={"mb-5 mt-5"}>
          <h2>개인정보 이용</h2>
          <p>
            회원관리, 서비스 제공·개선, 신규 서비스 개발 등을 위해 이용합니다.
          </p>
        </div>
        <div className={"mb-5 mt-5"}>
          <ul>
            <li>회원 식별/가입의사 확인, 본인/연령 확인, 부정이용 방지</li>
            <li>
              만 14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인, 법정
              대리인 권리행사 시 본인 확인
            </li>
            <li>친구에게 투자성향정보를 공유하는 기능 제공</li>
            <li>
              신규 서비스 개발, 다양한 서비스 제공, 문의사항 또는 불만처리,
              공지사항 전달
            </li>
            <li>유료서비스 이용 시 콘텐츠 등의 전송이나 배송·요금 정산</li>
            <li>
              서비스의 원활한 운영에 지장을 주는 행위(계정 도용 및 부정 이용
              행위 등 포함)에 대한 방지 및 제재
            </li>
            <li>
              인구통계학적 특성과 이용자의 관심, 기호, 성향의 추정을 통한 맞춤형
              콘텐츠 추천 및 마케팅에 활용
            </li>
            <li>
              서비스 이용 기록, 접속 빈도 및 서비스 이용에 대한 통계, 프라이버시
              보호 측면의 서비스 환경 구축, 서비스 개선에 활용
            </li>
          </ul>
        </div>

        <div className={"mb-5 mt-5"}>
          <p>
            개인정보의 추가적인 이용・제공을 하는 경우가 있습니다. 수집 목적과
            합리적으로 관련된 범위에서는 법령에 따라 이용자의 동의 없이
            개인정보를 이용하거나 제3자에게 제공할 수 있습니다. 이때 ‘당초 수집
            목적과 관련성이 있는지, 수집한 정황 또는 처리 관행에 비추어 볼 때
            개인정보의 추가적인 이용 또는 제공에 대한 예측 가능성이 있는지,
            이용자의 이익을 부당하게 침해하는지, 가명처리 또는 암호화 등 안전성
            확보에 필요한 조치를 하였는지’를 종합적으로 고려합니다.
          </p>
          <p>
            회사는 수집한 개인정보를 특정 개인을 알아볼 수 없도록 가명처리하여
            통계작성, 과학적 연구, 공익적 기록보존 등을 위하여 처리할 수
            있습니다. 이 때 가명정보는 재식별되지 않도록 추가정보와 분리하여
            별도 저장・관리하고 필요한 기술적・관리적 보호조치를 취합니다.
          </p>
        </div>

        <div className={"mb-5 mt-5"}>
          <h2>4. 개인정보 제공</h2>
          <p>
            회사는 이용자의 별도 동의가 있거나 법령에 규정된 경우를 제외하고는
            이용자의 개인정보를 제3자에게 제공하지 않습니다.
          </p>
          <p>
            회사는 이용자의 사전 동의 없이 개인정보를 제3자에게 제공하지
            않습니다.
          </p>
          <p>서비스 제공을 위해 아래와 같은 업무를 위탁합니다.</p>
          <ul>
            <li>
              서비스 제공을 위해 필요한 경우 개인정보 처리 업무 중 일부를 외부에
              위탁할 수 있습니다.
            </li>
            <li>
              위탁받은 업체가 위탁받은 업무 목적 외로 개인정보를 처리하는 것을
              제한하고, 기술적・관리적 보호조치 적용 및 재위탁 제한 등 위탁받은
              업체의 개인정보 보호 관련 법령 준수 여부를 관리·감독하고 있습니다.
            </li>
          </ul>
        </div>

        <div className={"mb-5 mt-5"}>
          <h2>5. 개인정보 파기</h2>
          <p>
            수집 및 이용목적이 달성된 경우 수집한 개인정보는 지체없이 파기하며,
            절차 및 방법은 아래와 같습니다.
          </p>
          <ul>
            <li>
              수집 및 이용 목적의 달성 또는 회원 탈퇴 등 파기 사유가 발생한 경우
              개인정보의 형태를 고려하여 파기방법을 정합니다.
            </li>
            <li>
              전자적 파일 형태인 경우 복구 및 재생되지 않도록 안전하게 삭제하고,
              그 밖에 기록물, 인쇄물, 서면 등의 경우 분쇄하거나 소각하여
              파기합니다.
            </li>
          </ul>
        </div>
      </ul>

      <div className={"mb-5 mt-5 flex flex-col justify-center"}>
        <div className={"mb-5 mt-5"}>
          <h2>
            내부 방침에 따라 일정 기간 보관 후 파기하는 정보는 아래와 같습니다.
          </h2>
          <p>1) 아래 정보는 탈퇴일부터 최대 1년간 보관 후 파기합니다.</p>
          <ul>
            <li>
              안내메일 발송 및 CS문의 대응을 위해 탈퇴안내 이메일 주소를
              암호화하여 보관
            </li>
            <li>서비스 부정이용 기록</li>
          </ul>
          <p>
            또한, 회사는 ‘개인정보 유효기간제’에 따라 1년간 서비스를 이용하지
            않은 이용자의 개인정보를 별도로 분리 보관 또는 삭제하고 있으며, 분리
            보관된 개인정보는 4년간 보관 후 지체없이 파기합니다.
          </p>
          <p>
            이 외에 법령에 따라 일정기간 보관해야 하는 개인정보는 아래 표와
            같습니다.
          </p>
        </div>
        <table>
          <thead>
            <tr>
              <th>항목</th>
              <th>보관 기간</th>
              <th>관련 법령</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>전자상거래 등에서의 소비자보호에 관한 법률</td>
              <td>5년</td>
              <td>전자상거래 등에서의 소비자보호에 관한 법률</td>
            </tr>
            <tr>
              <td>통신비밀보호법</td>
              <td>12개월</td>
              <td>통신비밀보호법</td>
            </tr>
            <tr>
              <td>소비자의 불만 또는 분쟁처리에 관한 기록</td>
              <td>3년</td>
              <td>전자상거래 등에서의 소비자보호에 관한 법률</td>
            </tr>
            <tr>
              <td>병원에서의 환자의 진료기록</td>
              <td>5년</td>
              <td>의료법</td>
            </tr>
            <tr>
              <td>
                <Image
                  width={320}
                  height={160}
                  alt=""
                  className={"w-full h-full"}
                  src={"/images/policy.png"}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className={"mb-5 mt-5"}>
          <h2>개인정보의 처리 위탁</h2>
          <p>회사의 개인정보의 처리 위탁은 아래와 같습니다.</p>
        </div>

        <div className={"mb-5 mt-5"}>
          <ol>
            <li>
              <p>휴대폰을 통한 결제 대행</p>
              <ul>
                <li>수탁업체: (주) 다날</li>
                <li>
                  위탁업무 내용: 서비스 계약과 이용을 위한 결제 처리 및 결제
                  도용 방지
                </li>
              </ul>
            </li>

            <li>
              <p>신용카드를 통한 결제 대행</p>
              <ul>
                <li>수탁업체: ㈜KG이니시스</li>
                <li>
                  위탁업무 내용: 서비스 계약 이용을 위한 결제 처리 및 결제 도용
                  방지
                </li>
              </ul>
            </li>

            <li>
              <p>상담을 위한 고객센터 툴(tool)</p>
              <ul>
                <li>수탁업체: ㈜굿텔레콤</li>
                <li>
                  위탁업무 내용: 문의 접수 및 처리를 위한 고객센터 tool 제공
                </li>
              </ul>
            </li>

            <li>
              <p>카카오 알림톡</p>
              <ul>
                <li>수탁업체: ㈜카카오</li>
                <li>
                  위탁업무 내용: 결제 정보 제공, 비밀번호 변경 등 계정 상태의
                  변경 안내, 맞춤형 서비스 안내
                </li>
              </ul>
            </li>

            <li>
              <p>간편 결제를 통한 결제 대행</p>
              <ul>
                <li>수탁업체: ㈜카카오페이</li>
                <li>
                  위탁 업무 내용: 서비스 계약 이용을 위한 결제 처리 및 결제 도용
                  방지
                </li>
              </ul>
            </li>

            <li>
              <p>간편 결제를 통한 결제 대행</p>
              <ul>
                <li>수탁업체: ㈜네이버파이낸셜</li>
                <li>
                  위탁 업무 내용: 서비스 계약 이용을 위한 결제 처리 및 결제 도용
                  방지
                </li>
              </ul>
            </li>
            <li>
              <p>데이터 보관 및 시스템 운영</p>
              <ul>
                <li>
                  수탁업체 : Amazon Web Service(대한민국 서울 (AWS Seoul
                  Region))
                </li>
                <li>
                  위탁 업무 내용 : 서비스 제공을 위한 데이터 보관 및 시스템 운영
                </li>
                <li>
                  개인정보 항목 : 서비스 제공 과정에서 수집한 모든 개인정보
                </li>
                <li>
                  개인정보 이전일시 : 서비스 이용을 위한 필요 정보 입력 시
                </li>
                <li>
                  개인정보 보유, 이용기간 : 회원 탈퇴 또는 개인정보 유효기간
                  도래 시까지 보관
                </li>
              </ul>
            </li>
          </ol>
        </div>
        <div>
          <div className={"mb-5 mt-5"}>
            <h2>이용자 및 법정대리인의 권리와 행사 방법</h2>
            <p>회사는 여러분의 권리를 보호합니다.</p>

            <p>
              이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며,
              수집・이용, 제공에 대한 동의 철회 또는 가입 해지를 요청할 수
              있습니다.
            </p>

            <p>
              서비스 내 설정을 통해 회원정보 수정이나 회원탈퇴를 할 수 있고,
              고객센터를 통해 서면, 전화 또는 이메일로 요청하시면 지체 없이
              조치하고 있습니다. 개인정보의 오류에 대한 정정을 요청한 경우
              정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지
              않습니다.
            </p>

            <p>
              만 14세 미만 아동의 법정대리인은 아동의 개인정보를 조회하거나 수정
              및 삭제, 처리정지, 수집 및 이용, 제공 동의를 철회할 권리를
              가집니다.
            </p>
          </div>
        </div>

        <div className={"mb-5 mt-5"}>
          <h2>개인정보 자동 수집 장치에 관한 사항 (설치ㆍ운영 및 거부)</h2>

          <p>웹기반 서비스 제공을 위하여 쿠키를 설치ㆍ운영할 수 있습니다.</p>

          <p>
            빠르고 편리한 웹사이트 사용을 지원하고 맞춤형 서비스를 제공하기 위해
            쿠키를 사용합니다.
          </p>
        </div>

        <div className={"mb-5 mt-5"}>
          <p>
            <strong>쿠키란?</strong>
            <br />
            이용자가 웹사이트를 접속할 때 해당 웹사이트에서 이용자의 브라우저에
            보내는 아주 작은 텍스트 파일로 이용자 PC에 저장됩니다.
          </p>
        </div>

        <div className={"mb-5 mt-5"}>
          <p>
            <strong>사용목적</strong>
            <br />
            개인화되고 맞춤화된 서비스를 제공하기 위해서 이용자의 정보를
            저장하고 수시로 불러오는 쿠키를 사용합니다. 이용자가 웹사이트에
            방문할 경우 웹 사이트 서버는 이용자의 디바이스에 저장되어 있는
            쿠키를 읽어 이용자의 환경설정을 유지하고 맞춤화된 서비스를 제공하게
            됩니다. 쿠키는 이용자가 웹 사이트를 방문할 때, 웹 사이트 사용을
            설정한대로 접속하고 편리하게 사용할 수 있도록 돕습니다. 또한,
            이용자의 웹사이트 방문 기록, 이용 형태를 통해서 최적화된 광고 등
            맞춤형 정보를 제공하기 위해 활용됩니다.
          </p>
        </div>

        <div className={"mb-5 mt-5"}>
          <h2>쿠키 수집 거부</h2>
          <p>
            이용자는 쿠키 설치에 대한 선택권을 가지고 있으며, 웹브라우저 상단의
            ‘설정 &gt; 개인정보보호 &gt; 쿠키 및 기타 사이트 데이터’ 경로에서
            쿠키 설정을 통해 쿠키 허용 및 거부를 할 수 있습니다. 다만, 쿠키
            설치를 거부할 경우 웹 사용이 불편해지며, 로그인이 필요한 일부 서비스
            이용이 어려울 수 있습니다.
          </p>
        </div>

        <div className={"mb-5 mt-5"}>
          <h2>개인정보의 안전성 확보 조치에 관한 사항</h2>
          <p>회사는 이용자의 개인정보 보호를 위해 아래의 노력을 합니다.</p>
        </div>

        <div className={"mb-5 mt-5"}>
          <ul>
            <li>이용자의 개인정보를 암호화하고 있습니다.</li>
            <li>
              이용자의 개인정보를 암호화된 통신구간을 이용하여 전송하고,
              비밀번호 등 중요정보는 암호화하여 보관하고 있습니다.
            </li>
            <li>
              해킹이나 컴퓨터 바이러스로부터 보호하기 위하여 노력하고 있습니다.
            </li>
            <ul>
              <li>
                해킹이나 컴퓨터 바이러스 등에 의해 이용자의 개인정보가
                유출되거나 훼손되는 것을 막기 위해 외부로부터 접근이 통제된
                구역에 시스템을 설치하고 있습니다.
              </li>
              <li>
                해커 등의 침입을 탐지하고 차단할 수 있는 시스템을 설치하여
                24시간 감시하고 있으며, 백신 프로그램을 설치하여 시스템이 최신
                악성코드나 바이러스에 감염되지 않도록 노력하고 있습니다.
              </li>
              <li>
                또한 새로운 해킹/보안 기술에 대해 지속적으로 연구하여 서비스에
                적용하고 있습니다.
              </li>
            </ul>
          </ul>
        </div>

        <div className={"mb-5 mt-5"}>
          <h3>개인정보에 접근할 수 있는 사람을 최소화하고 있습니다.</h3>
          <p>
            개인정보를 처리하는 임직원을 최소한으로 제한하고 있습니다. 또한
            개인정보를 보관하는 데이터베이스 시스템과 개인정보를 처리하는
            시스템에 대한 비밀번호의 생성과 변경, 그리고 접근할 수 있는 권한에
            대한 체계적인 기준을 마련하고 지속적인 감사를 실시하고 있습니다.
          </p>
          <p>
            임직원에게 이용자의 개인정보 보호에 대해 정기적인 교육을 실시하고
            있습니다. 개인정보를 처리하는 모든 임직원들을 대상으로 개인정보보호
            의무와 보안에 대한 정기적인 교육과 캠페인을 실시하고 있습니다.
          </p>
          <div className={"mb-5 mt-5"}>
            <h3>개정 전 고지의무 등 안내</h3>
            <p>
              법령이나 서비스의 변경사항을 반영하기 위한 목적 등으로 개인정보
              처리방침을 수정할 수 있습니다. 개인정보 처리방침이 변경되는 경우
              최소 7일 전 변경 사항을 사전에 안내하겠습니다. 다만, 수집하는
              개인정보의 항목, 이용목적의 변경 등과 같이 이용자 권리의 중대한
              변경이 발생할 때에는 최소 30일 전에 미리 알려드리겠습니다.
            </p>
            <p>
              ㈜그네테크홀딩스는 이용자 여러분의 정보를 소중히 생각하며,
              이용자가 더욱 안심하고 서비스를 이용할 수 있도록 최선의 노력을
              다할 것을 약속드립니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Policy;
