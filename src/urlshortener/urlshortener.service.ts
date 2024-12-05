import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as shortid from 'shortid';
import { Url } from 'src/schemas/url.schema';
import axios from 'axios';

@Injectable()
export class UrlshortenerService {
  constructor(@InjectModel(Url.name) private urlSchema: Model<Url>) {}

  async createShortUrl(url: string) {
    const id: string = await shortid.generate();
    const newUrl = new this.urlSchema({
      shortenUrl: id,
      redirectUrl: url,
    });
    await newUrl.save();
    return { shortenUrl: id };
  }

  async getUrl(shortId: string) {
    const data: any = await this.urlSchema.findOne({ shortenUrl: shortId });
    if (data) {
      return data.redirectUrl;
    }
    return null;
  }

  async getpreview(url: string) {
    const response = await axios.get(url);
    const html = response.data;
    const metadata = {
      title: html.match(/<title>(.*?)<\/title>/)[1],
      image:
        html.match(/<meta property="og:image" content=['"](.*?)['"]/i)?.[1] ||
        html.match(/<meta name="twitter:image" content=['"](.*?)['"]/i)?.[1] ||
        html.match(
          /<meta property="og:image:url" content=['"](.*?)['"]/i,
        )?.[1] ||
        null,
     
    };


    return metadata;
  }
}
