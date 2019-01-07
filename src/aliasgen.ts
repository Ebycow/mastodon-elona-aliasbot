import * as fs from 'fs';
import * as path from 'path';
import * as iconv from 'iconv-lite';
import * as csv from 'csv-parse/lib/sync';

export class ElonaNickName {

    private wordList : any[];

    constructor() {
        this.wordList = this.getWordList();
        
    }

    private getWordList (): any[] {
        return csv.default(iconv.decode(fs.readFileSync(path.resolve('ndata.csv')), 'SHIFT_JIS'));
    
    }

    private create(){
        let repeat;

        let frow : number;
        let fcol : number;

        let pre : boolean;
        let conj : string;

        let lrow : number;
        let lcol : number;

        do {
            repeat = false;

            frow = 0;
            fcol = 0;
            
            lrow = 0;
            lcol = 0;

            pre = false;
            conj = "";


            // 行と列番号をランダム決定。データが空白ならやり直し。
            do {
                frow = Math.floor( Math.random() * 388 );
                fcol = Math.floor( Math.random() * 14 );

            } while( this.wordList[frow][fcol] === ("") || this.wordList[frow][fcol] === undefined );


            // 先頭文字の列番号が0, 1の場合
            if( fcol <= 1 ) {
                
                // 1/10の確率で、先頭文字の列番号を10に再設定。
                if(Math.floor( Math.random() * 10 ) + 1 === 1) {
                    // ない場合がある
                    fcol = 10;
                    if( this.wordList[frow][fcol] === ("") ){
                        repeat = true;
                    }

                }

                conj = "の";

            // 先頭文字の列番号が10, 11の場合
            } else if( fcol === 10 || fcol === 11 ){
                
                const rand = Math.floor( Math.random() * 25 ) + 1;

                // 5/25の確率:先頭文字列の列番号を0に再設定。1/2の確率で「の」を追加。
                if(rand <= 5){
                    // ない場合がある
                    fcol = 0;
                    if( this.wordList[frow][fcol] === ("") ){
                        repeat = true;
                    }

                    if(Math.floor( Math.random() * 2 ) + 1 === 1) {
                        conj = "の";
        
                    }

                // 4/25の確率:「・オブ・」を追加。
                } else if ((rand - 5) % 5 === 0) {
                    conj = "・オブ・";

                // 4/25の確率:「・」を追加。
                } else if ((rand - 5) % 5 === 1) {
                    conj = "・";

                // 4/25の確率:文字の先頭に「ザ・」を追加して、最終処理へスキップ。
                } else if ((rand - 5) % 5 === 2) {
                    pre = true;

                }

            }

            

            if(!pre || !repeat){
                let cnt : number = 0;

                do {
                    // 100回試してNGなら、最初からやり直し。
                    if(cnt >= 100){
                        repeat = true;
                        break;
                    }

                    // 行番号をランダム決定。
                    do {
                        lrow = Math.floor( Math.random() * 388 );
    
                    } while(
                        lrow === frow || // 先頭文字と行番号が同じならやり直し。
                        // 先頭文字と末尾文字の名称カテゴリが被った場合、どちらかが『万能』で無ければやり直し。
                        ((this.wordList[lrow][14] === this.wordList[frow][14]) && (this.wordList[lrow][14] !== "万能"))
                    );
    
                    // 列番号を決定。先頭文字の列番号が10未満ならrnd(2)、それ以外は10+rnd(2)で設定。
                    if(fcol > 10) {
                        lcol = Math.floor( Math.random() * 2 );
                    } else {
                        lcol = Math.floor( Math.random() * 2 ) + 10;
                    }

                    cnt++;

                } while( this.wordList[lrow][lcol] === "" || this.wordList[lrow][lcol] === undefined );
                

            }

            // 作成文字が14文字以上なら、最初からやり直し。
            if((pre ? "ザ・" + this.wordList[frow][fcol] : this.wordList[frow][fcol] + conj + this.wordList[lrow][lcol]).length >= 14){
                repeat = true;
            }

        } while(repeat);

        return pre ? "ザ・" + this.wordList[frow][fcol] : this.wordList[frow][fcol] + conj + this.wordList[lrow][lcol];
        

    }

    public reroll () : string[] {
        const cand : string[] = [];
        for (let i = 0; i <= 15; i++) {
            cand.push(this.create());
            
        }
        return cand;

    }

}
